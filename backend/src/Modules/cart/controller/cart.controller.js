const ApiError = require('../../../../utils/apiError');
const Cart = require('../../../../models/Cart.model');
const User = require("../../../../models/user.Model");
const Product = require('../../../../models/product.Model');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const handlerFactory = require('../../handlersFactory');

// Function to get userId from token

const getUserIdFromToken = (req) => {
  try {
    let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) throw new ApiError('No token provided', 401);
    // console.log("Extracted Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("Decoded Token:", decoded);
    return decoded.userId;
  } catch (err) {
    console.error("Token verification error:", err);
    throw new ApiError('Invalid token', 401);
  }
};

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
// Get Cart
exports.getCart = asyncHandler(async (req, res, next) => {
  try {
    const userId = getUserIdFromToken(req);
    const items = await Cart.find({ userId }).sort({ timestamp: 1 });
    let totalPrice = items.reduce((acc, item) => acc + item.price, 0);

    res.status(200).send({
      data: items,
      pageTitle: "Cart",
      totalPrice: totalPrice
    });
  } catch (err) {
    return next(new ApiError('Failed to retrieve cart items', 500));
  }
});



// Create a Cart item
exports.createCartItem = asyncHandler(async (req, res, next) => {
  try {
    const { name, price, amount, image, productId } = req.body;
    const userId = getUserIdFromToken(req);
    const cartItemData = { name, price, amount, image, userId, productId, timestamp: Date.now() };

    const product = await Product.findById(productId);
    if (!product) {
      return next(new ApiError('product not found', 404));
    }

    const currentuser = await User.findOne({ _id: userId });
    if (!currentuser) {
      return next(new ApiError('currentuser not found', 404));
    }

    const cart = await Cart.findOne({ productId, userId });
    if (cart) {
      return next(new ApiError('Item already exists in cart', 400));
    }

    // Add item to cart
    const newCart = new Cart(cartItemData);
    await newCart.save();

    // Update user cart
    currentuser.Cart.push({ Cart_id: newCart._id, product_name: newCart.name, product_id: newCart.productId });
    await currentuser.save();

    res.status(201).json({
      status: 'success',
      message: 'Item added to cart successfully',
      data: newCart
    });
  } catch (error) {
    console.error(error);
    return next(new ApiError('Internal Server Error', 500));
  }
});


// Update or edit Cart item
exports.postSave = asyncHandler(async (req, res, next) => {
  // console.log('Request body:', req.body);

  try {
    const { cartId, amount } = req.body;
    const userId = getUserIdFromToken(req);
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId, userId: userId },
      { amount, timestamp: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedCart) {
      return next(new ApiError(`No Cart found for this id ${cartId}`, 404));
    }

    res.status(200).json({ data: updatedCart, message: 'Cart updated successfully' });
  } catch (err) {
    return next(new ApiError('Failed to update item', 500));
  }
});


// Delete a cart item
exports.postDelete = asyncHandler(async (req, res, next) => {

  try {
    const cartId = req.body.cartId;
    const userId = getUserIdFromToken(req);
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return next(new ApiError('Cart item not found', 404));
    }
    await Cart.findByIdAndDelete(cartId);
    await User.updateOne(
      { _id: userId },
      { $pull: { Cart: { Cart_id: cartId } } }
    );

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (err) {
    console.error(err);
    return next(new ApiError('Failed to remove item from cart', 500));
  }
});

















// Remove all items for a user
exports.removeAllItemsForUser = asyncHandler(async (req, res, next) => {
  const userId = getUserIdFromToken(req);

  try {
    await Cart.deleteMany({ userId });
    res.sendStatus(204); // No Content
  } catch (err) {
    next(new ApiError('Failed to remove items from cart', 500));
  }
});

// Remove an item from cart
exports.removeItem = asyncHandler(async (req, res, next) => {
  const productId = req.params.productId;
  const userId = getUserIdFromToken(req);

  try {
    const cartItem = await Cart.findOne({ productId, userId });
    if (!cartItem) {
      return next(new ApiError('Cart item not found', 404));
    }
    await Cart.deleteOne({ productId, userId });
    await User.updateOne(
      { _id: userId },
      { $pull: { Cart: { product_id: productId } } }
    );

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (err) {
    console.error(err);
    return next(new ApiError('Failed to remove item from cart', 500));
  }
});

// exports.getAllCarts = handlerFactory.getAll(Cart);
exports.getAllCarts = asyncHandler(async (req, res, next) => {
  try {
    await handlerFactory.getAll(Cart, "Carts")(req, res, next);  // Call handler directly to fetch products and pagination data
    const { documents, paginationResult } = req;  // Extract documents and pagination data from req\    console.log(products)
    const sortedDocuments = documents.sort((a, b) => a.code - b.code);
    res.status(200).json({
      status: 'success',
      results: sortedDocuments.length,
      paginationResult,
      products: sortedDocuments,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError('Failed to retrieve Cart data', 500));
  }
});