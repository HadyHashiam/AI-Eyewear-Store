const ApiError = require('../../../../utils/apiError');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../../../models/user.Model');
const Product = require('../../../../models/product.Model');
const Cart = require('../../../../models/Cart.model');
const Fav = require('../../../../models/Fav.model');
const handlerFactory = require('../../handlersFactory');


// Function to get userId from token

// const getUserIdFromToken = (req) => {
//   try {
//     let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
//     if (!token) throw new ApiError('No token provided', 401);
//     // console.log("Extracted Token:", token);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     // console.log("Decoded Token:", decoded);
//     return decoded.userId;
//   } catch (err) {
//     console.error("Token verification error:", err);
//     throw new ApiError('Invalid token', 401);
//   }
// };

const getUserIdFromTokentwo = (req) => {
  try {
    let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) console.log("Token verification error:");
    // console.log("Extracted Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("Decoded Token:", decoded);
    return decoded.userId;
  } catch (err) {
    console.log("Token verification error:");
    throw new ApiError('Invalid token', 401);
  }
};


// Render home page
exports.getHomeWithCart = asyncHandler(async (req, res, next) => {
  try {
    let userId;
    try {
      userId = getUserIdFromTokentwo(req);
    } catch (err) {
      userId = null; // If no token, don't stop the execution, just consider that there is no user

    }

    // Fetch products using handlerFactory (with pagination)
    await handlerFactory.getAll(Product)(req, res, next);
    const { documents } = req;
    let products = documents;

    let cartItems = [], favItems = [];
    let cartProductIds = new Set(), favProductIds = new Set();

    if (userId) {
      cartItems = await Cart.find({ userId }).sort({ timestamp: 1 });
      favItems = await Fav.find({ userId }).sort({ timestamp: 1 });

      cartProductIds = new Set(cartItems.map(item => item.productId.toString()));
      favProductIds = new Set(favItems.map(item => item.productId.toString()));
    }
    const baseUrl = "http://localhost:3000"; // استبدله بـ رابط السيرفر الفعلي عند النشر

    // Add cart and favorite status to products
    const productsWithCartAndFavStatus = products.map(product => {
      let imageUrl = product.image; // الصورة كما هي في الداتا بيز

      // إذا لم يكن الرابط يحتوي على "http" أو "https"، اعتبره صورة محلية
      if (!imageUrl.startsWith("http")) {
        imageUrl = `${baseUrl}/images/${imageUrl}`;
      }

      return {
        ...product.toObject(),
        image: imageUrl, // تحديث رابط الصورة
        isInCart: cartProductIds.has(product._id.toString()),
        isFavorite: favProductIds.has(product._id.toString())
      };
    });

    // Sort products by 'code' in ascending order
    productsWithCartAndFavStatus.sort((a, b) => parseInt(a.code, 10) - parseInt(b.code, 10));

    // Calculate total cart price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    res.status(200).json({
      totalCartPrice: totalPrice,
      length: productsWithCartAndFavStatus.length,
      products: productsWithCartAndFavStatus,
      ...(userId && { itemsInFav: favItems, itemsInCart: cartItems }),
      pageTitle: "Home"
    });

  } catch (err) {
    console.error("Error fetching home data:", err);
    next(new ApiError("Failed to retrieve home data", 500));
  }
});
