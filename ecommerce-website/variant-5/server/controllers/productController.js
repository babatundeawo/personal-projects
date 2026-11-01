import Product from '../models/Product.js';

// GET /api/products?search=&category=&page=&limit=&sort=
export async function listProducts(req, res, next) {
  try {
    const { search, category, page = 1, limit = 12, sort = '-createdAt' } = req.query;

    const query = {};
    if (search) query.$text = { $search: search };
    if (category && category !== 'all') query.category = category;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(48, Math.max(1, parseInt(limit, 10) || 12));

    const [products, total, categories] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Product.countDocuments(query),
      Product.distinct('category')
    ]);

    res.json({
      products,
      page: pageNum,
      pages: Math.ceil(total / limitNum) || 1,
      total,
      categories
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/products/:slug
export async function getProduct(req, res, next) {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      'reviews.user',
      'name'
    );
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);

    res.json({ product, related });
  } catch (err) {
    next(err);
  }
}

// POST /api/products  (admin)
export async function createProduct(req, res, next) {
  try {
    const { name, description, price, category, images, stock } = req.body;
    if (!name || !description || price == null || !category) {
      return res.status(400).json({ message: 'name, description, price and category are required.' });
    }
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const product = await Product.create({
      name,
      slug: `${slug}-${Date.now().toString(36)}`,
      description,
      price,
      category,
      images: images || [],
      stock: stock ?? 0
    });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
}

// PUT /api/products/:id  (admin)
export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const editable = ['name', 'description', 'price', 'category', 'images', 'stock'];
    editable.forEach((field) => {
      if (req.body[field] !== undefined) product[field] = req.body[field];
    });

    await product.save();
    res.json({ product });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/products/:id  (admin)
export async function deleteProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch (err) {
    next(err);
  }
}

// POST /api/products/:slug/reviews
export async function addReview(req, res, next) {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ message: 'A rating and comment are required.' });
    }

    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    const already = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
    if (already) {
      return res.status(409).json({ message: 'You have already reviewed this product.' });
    }

    product.reviews.push({
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    });
    product.recalculateRating();
    await product.save();

    res.status(201).json({ message: 'Review added.', reviews: product.reviews });
  } catch (err) {
    next(err);
  }
}
