const { spawn } = require('child_process');
const fs = require('fs');
const ApiError = require('../../../../utils/apiError');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Product = require('../../../../models/product.Model');
const Cart = require('../../../../models/Cart.model');
const Fav = require('../../../../models/Fav.model');



const getUserIdFromToken = (req) => {
  try {
    let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) throw new ApiError('No token provided', 401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded.userId;
  } catch (err) {
    console.error("Token verification error:", err);
    throw new ApiError('Invalid token', 401);
  }
};

const linksForWomen = {
  Heart: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=3a23806194f44886874194218ec1b44c&metadata=01',
  Oblong: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=e17fc65754da44518d5aefd2603ccd72&metadata=01',
  Oval: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=4574ca8607b347b1a747d4d81b8e6740&metadata=01',
  Round: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=df2efc4e9304481d93054a546c3f85c8&metadata=01',
  Square: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=7298a8862792429b876b9dd27f65e163&metadata=01'
};

const linksForMen = {
  Heart: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=f35b7b45f0054cf6a5c2799248a6706f&metadata=01',
  Oblong: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=2104eacdb16144f5be8cf0a64bc0146a&metadata=01',
  Oval: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=075f41afdabb4adfafbf3469f04208e1&metadata=01',
  Round: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=f1e1b8de4b884342af4babc155f15f0c&metadata=01',
  Square: 'https://www.snapchat.com/unlock/?type=SNAPCODE&uuid=8ae43de8e60846f2a35aba6fe44efc2c&metadata=01'
};

// Function to map class IDs to face shape labels
const faceShapeMap = {
  "0": "Heart",
  "1": "Oblong",
  "2": "Oval",
  "3": "Round",
  "4": "Square"
};

exports.postRunDetection = asyncHandler(async (req, res, next) => {

  const userId = getUserIdFromToken(req);
  const pythonProcess = spawn('python', ['testmodel.py']);
  pythonProcess.on('close', async (code) => {
    if (code === 0) {
      console.log('Python script executed successfully');
      try {
        fs.readFile('E:\\Programming\\Back-end\\Node.js\\final project\\backend\\runs\\detect\\predict\\labels\\photo.txt', 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading prediction file:', err);
            return next(new ApiError('Error reading prediction file', 500)); // Send API error
          }
          const lines = data.split('\n');
          const classId = lines[0].split(' ')[0];
          const faceShape = faceShapeMap[classId] || "Unknown";
          console.log('Prediction value:', faceShape);
          return getrundetection(req, res, faceShape);
        });
      } catch (err) {
        console.error('Error reading prediction file:', err);
        return next(new ApiError('Error reading prediction file', 500)); // Send API error
      }
    } else {
      console.error('Error executing Python script');
      return next(new ApiError('Error executing Python script', 500)); // Send API error
    }
  });
});

const getrundetection = asyncHandler(async (req, res, faceShape) => {
  try {
    const userId = getUserIdFromToken(req);
    const products = await Product.find();
    const selectedProducts = products.filter(product =>
      product.face_shape.includes(faceShape)
    );

    const cartItems = await Cart.find({ userId });
    const favItems = await Fav.find({ userId });
    // Process cart and favorite items
    const cartProductIds = new Set(cartItems.map(item => item.productId.toString()));
    const favProductIds = new Set(favItems.map(item => item.productId.toString()));
    const productsWithCartAndFavStatus = selectedProducts.map(product => ({
      ...product.toObject(),
      isInCart: cartProductIds.has(product._id.toString()),
      isFavorite: favProductIds.has(product._id.toString())
    }));

    const hrefButtonForMen = linksForMen[faceShape] || "";
    const hrefButtonForWomen = linksForWomen[faceShape] || "";

    res.status(200).json({
      length: productsWithCartAndFavStatus.length,
      products: productsWithCartAndFavStatus,
      userId: userId,
      classId: faceShape,
      hrefButtonForMen,
      hrefButtonForWomen,
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return next(new ApiError('Error fetching products', 500)); // Send API error
  }
});
