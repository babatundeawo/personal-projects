export default function StarRating({ rating = 0, count }) {
  const rounded = Math.round(rating * 2) / 2;
  const stars = [1, 2, 3, 4, 5].map((n) => {
    if (n <= rounded) return '★';
    if (n - 0.5 === rounded) return '⯨';
    return '☆';
  });
  return (
    <span className="product-rating">
      {stars.join('')} {count != null && <span>({count})</span>}
    </span>
  );
}
