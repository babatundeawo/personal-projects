const transporter = require('../config/email');
exports.sendOrderConfirmation = async (to, order) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Order Confirmation #${order._id}`,
    html: `<h2>Thank you for your order!</h2><p>Order ID: ${order._id}</p><p>Total: $${order.totalPrice}</p><p>We'll notify you when it ships.</p>`
  };
  await transporter.sendMail(mailOptions);
};