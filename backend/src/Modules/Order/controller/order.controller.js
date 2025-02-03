
const Product = require('../../../../models/product.Model');
const ApiError = require('../../../../utils/apiError');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Cart = require('../../../../models/Cart.model');
const Order = require('../../../../models/Order.model');
const User = require("../../../../models/user.Model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError('No token provided', 401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("\nDecoded Token:", decoded);
    return decoded.userId;
  } catch (err) {
    throw new ApiError('Invalid token', 401);
  }
};
// // Get order details
exports.getOrderVerify = asyncHandler(async (req, res, next) => {
  try {
    const cartItem = await Cart.findById(req.query.cartId);
    if (!cartItem) {
      return next(new ApiError('Cart item not found', 404));
    }

    res.status(200).json({
      cart: cartItem,
      pageTitle: "Delivery Details",
    })
  } catch (err) {
    console.error(err);
    return next(new ApiError('Failed to get cart item', 500));
  }
});


// Get orders by user
exports.postCheckout = asyncHandler(async (req, res, next) => {
  const orderItemData = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: orderItemData.title,
            metadata: {
              product_id: orderItemData.productId,
              cart_id: orderItemData.cartId
            }
          },
          unit_amount: orderItemData.price * 100 // Stripe expects amount in cents
        },
        quantity: orderItemData.amount
      }
    ],
    mode: 'payment',
    success_url: `${process.env.BASE_URL2}/orders`,
    cancel_url: `${process.env.BASE_URL2}/error`
  });

  res.sessionUrl = session.url;
  res.status(200).json({ data: orderItemData, url: session.url });

});


exports.getsucces = asyncHandler(async (req, res, next) => {
  const orderItemData = req.query;
  const userId = getUserIdFromToken(req);
  try {
    const currentuser = await User.findById(userId);
    if (!currentuser) {
      return next(new ApiError('Current user not found', 404));
    }
    // Step 1: Check if quantity is sufficient
    const product = await Product.findById(orderItemData.productId);
    if (!product || product.Quantity < orderItemData.amount) {
      return next(new ApiError('Insufficient product quantity', 400));
    }
    // Step 2: Deduct quantity from product
    product.Quantity -= orderItemData.amount;
    await product.save();

    // Step 3: Delete item from cart
    await Cart.findByIdAndDelete(orderItemData.cartId);
    // Step 4: Create a new order
    orderItemData.timestamp = Date.now();
    const order = new Order({
      userId: userId,
      productId: orderItemData.productId,
      quantity: orderItemData.amount,
      status: "success",
      total: orderItemData.amount * orderItemData.price,
      ...orderItemData
    });
    await order.save();
    // Step 5: Update user orders
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          Order: {
            product_name: orderItemData.title,
            product_id: orderItemData.productId
          }
        }
      }
    );
    await User.updateOne(
      { _id: userId },
      { $pull: { Cart: { product_name: orderItemData.title } } }
    );
    res.status(200).json({ data: orderItemData, message: "Order placed successfully" });
  } catch (err) {
    console.error(err);
    return next(new ApiError('Failed to process checkout', 500));
  }
});



// Cancel an order
exports.postCancel = asyncHandler(async (req, res, next) => {
  const { orderId } = req.body;
  const userId = getUserIdFromToken(req);
  try {
    // Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return next(new ApiError('Order not found', 404));
    }
    // Remove order
    await Order.findByIdAndDelete(orderId);
    // Update user
    const productName = order.title; // Use 'name' instead of 'productName'
    await User.updateOne(
      { _id: userId },
      { $pull: { Order: { product_name: productName } } }
    );

    res.status(200).json("Order Canceled successfully")
  } catch (err) {
    console.error(err);
    return next(new ApiError('Failed to cancel order', 500));
  }
});

// Get orders by user
exports.getOrder = asyncHandler(async (req, res, next) => {
  const userId = getUserIdFromToken(req);
  try {
    const orders = await Order.find({ userId: userId }).sort({ timestamp: 1 });
    res.status(200).json({
      length: orders.length,
      pageTitle: "Orders",
      data: orders,
    });
  } catch (err) {
    console.error(err);
    return next(new ApiError('Failed to get orders', 500));
  }
});



// exports.createFilterObj = (req, res, next) => {
//   let filterObject = {};
//   if (req.params.categoryId) filterObject = { category: req.params.categoryId };
//   req.filterObj = filterObject;
//   next();
// };




