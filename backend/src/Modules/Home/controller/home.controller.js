const ApiError = require('../../../../utils/apiError');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../../../models/user.Model');
const Product = require('../../../../models/product.Model');
const Cart = require('../../../../models/Cart.model');
const Fav = require('../../../../models/Fav.model');
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

// Get all Products
exports.GetALLProducts = asyncHandler(async (req, res, next) => {
  try {
    await handlerFactory.getAll(Product)(req, res, next);  // Call handler directly to fetch products and pagination data
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
    next(new ApiError(`Failed to retrieve Products data ${err}`, 500));
  }
});


// Render home page
exports.getHomeWithCart = asyncHandler(async (req, res, next) => {
  try {
    const userId = getUserIdFromToken(req);
    await handlerFactory.getAll(Product)(req, res, next);  // Call handler directly to fetch products and pagination data

    const { documents } = req;  // Extract documents and pagination data from req\    console.log(products)
    let products = documents

    const cartItems = await Cart.find({ userId }).sort({ timestamp: 1 });
    const favItems = await Fav.find({ userId }).sort({ timestamp: 1 });

    // Process cart and favorite items
    const cartProductIds = new Set(cartItems.map(item => item.productId.toString()));
    const favProductIds = new Set(favItems.map(item => item.productId.toString()));

    const productsWithCartAndFavStatus = products.map(product => ({
      ...product.toObject(),
      isInCart: cartProductIds.has(product._id.toString()),
      isFavorite: favProductIds.has(product._id.toString())
    }));
    // Sort products by 'code' in ascending order (numeric comparison)
    productsWithCartAndFavStatus.sort((a, b) => {
      const codeA = parseInt(a.code, 10);
      const codeB = parseInt(b.code, 10);
      return codeA - codeB;
    });
    // const sortedDocuments = productsWithCartAndFavStatus.sort((a, b) => a.code - b.code);

    // Calculate total price for cart items
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    res.status(201).json({
      totaCartlPrice: totalPrice,
      length: productsWithCartAndFavStatus.length,
      products: productsWithCartAndFavStatus,
      itemsInFav: favItems,
      itemsInCart: cartItems,
      pageTitle: "Home"
    });
  } catch (err) {
    console.log(err);
    next(new ApiError(`Failed to retrieve home data ${err}`, 500));
  }
});

