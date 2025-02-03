const ApiError = require('../../../../utils/apiError');
const Fav = require('../../../../models/Fav.model');
const User = require("../../../../models/user.Model");
const Product = require('../../../../models/product.Model');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

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




// Get all favorite items for a user
exports.getFavs = asyncHandler(async (req, res, next) => {
  const userId = getUserIdFromToken(req);
  try {
    const favItems = await Fav.find({ userId }).sort({ timestamp: 1 });
    res.status(200).json({ status: 200, length: favItems.length, data: favItems, message: 'Favorite items retrieved successfully' });
  } catch (err) {
    return next(new ApiError('Failed to retrieve favorite items', 500));
  }
});

// Add a favorite item
exports.postFav = asyncHandler(async (req, res, next) => {

  try {
    const { name, price, image, productId } = req.body;
    const userId = getUserIdFromToken(req);
    const favData = { name, price, image, userId, productId, timestamp: Date.now() };

    const currentuser = await User.findOne({ _id: userId });
    if (!currentuser) {
      return next(new ApiError('currentuser not found', 404));
    }
    const product = await Product.findById(productId);
    if (!product) {
      return next(new ApiError('product not found', 404));
    }

    const newFav = new Fav(favData);
    await newFav.save();

    currentuser.Fav.push({ Fav_id: newFav._id, product_name: newFav.name, product_id: productId });
    await currentuser.save();

    res.status(201).json({
      status: 'success',
      message: 'Item added to favorites successfully',
      data: newFav
    });
  } catch (err) {
    console.error(err);
    return next(new ApiError('Failed to add item to favorites', 500));
  }
});

// Delete a favorite item
exports.deleteFav = asyncHandler(async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = getUserIdFromToken(req);
    const favItem = await Fav.findOne({ productId, userId });
    if (!favItem) {
      return next(new ApiError('Favorite item not found', 404));
    }

    await Fav.deleteOne({ productId, userId });

    await User.updateOne(
      { _id: userId },
      { $pull: { Fav: { product_id: productId } } }
    );

    res.status(200).json({ message: 'Item removed from favorites successfully' });
  } catch (err) {
    console.error('Error removing item from favorites:', err);
    return next(new ApiError('Failed to remove item from favorites', 500));
  }
});



// exports.getAllCarts = handlerFactory.getAll(Cart);
exports.getAllFavs = asyncHandler(async (req, res, next) => {
  try {
    await handlerFactory.getAll(Fav, "Favorites")(req, res, next);  // Call handler directly to fetch products and pagination data
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
    next(new ApiError('Failed to retrieve Fav data', 500));
  }
});

