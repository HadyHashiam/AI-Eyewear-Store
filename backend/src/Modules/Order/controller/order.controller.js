
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
    throw new ApiError(`Invalid token${err}`, 401);
  }
};


exports.postCheckout = asyncHandler(async (req, res, next) => {
  try {
    const orderItemData = req.body;
    const userId = getUserIdFromToken(req);

    const newOrder = new Order({
      ...orderItemData,
      userId: userId,
      total: orderItemData.amount * orderItemData.price,
      status: "pending"
    });
    await newOrder.save();

    const metadata = {
      product_id: orderItemData.productId,
      cart_id: orderItemData.cartId,
      userId: getUserIdFromToken(req),
      order_id: newOrder._id.toString()
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: orderItemData.title,
            },
            unit_amount: orderItemData.price * 100,
          },
          quantity: orderItemData.amount,
        },
      ],
      mode: 'payment',
      metadata: metadata,
      success_url: `${process.env.success_url}`,
      cancel_url: `${process.env.cancel_url}`,
    });

    res.status(200).json({ data: orderItemData, url: session.url });
  } catch (err) {
    return next(new ApiError(`Error processing payment ${err}`, 500));
  }
});



exports.handleWebhook = asyncHandler(async (req, res) => {

  const sig = req.headers['stripe-signature'];
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log("Stripe Webhook Event successfully verified:");
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return next(new ApiError(`Webhook Error: ${err.message}`, 400));
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const { product_id, cart_id, order_id } = session.metadata;
    if (product_id) {
      const order = await handleSessionCompleted(order_id, cart_id, product_id)
      res.status(200).json({ data: order, received: true });
    }
  }

});

const handleSessionCompleted = async (orderId, cart_id, product_id) => {
  try {
    const product = await Product.findById(product_id);
    const order = await Order.findById(orderId);

    if (!order) throw new ApiError('Order not found', 404);
    if (!product || product.Quantity < order.amount) {
      return console.error("Insufficient product quantity");
    } else {
      product.Quantity -= order.amount;
      await product.save();
    }

    await Cart.findByIdAndDelete(cart_id);
    order.status = "success";
    await order.save();

    return order;
  } catch (err) {
    return next(new ApiError(`Error handling charge.succeeded:${err} `, 404));
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
    return next(new ApiError(`Failed to cancel order ${err}`, 500));
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
    return next(new ApiError(`Failed to get orders ${err}`, 500));
  }
});



// exports.createFilterObj = (req, res, next) => {
//   let filterObject = {};
//   if (req.params.categoryId) filterObject = { category: req.params.categoryId };
//   req.filterObj = filterObject;
//   next();
// };