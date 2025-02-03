
const ApiError = require('../../../../utils/apiError');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../../../../models/user.Model');



const getUserIdFromToken = (req) => {
  try {
    let token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if (!token) throw new ApiError('No token provided', 401);
    console.log("Extracted Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded);
    return decoded.userId;
  } catch (err) {
    console.error("Token verification error:", err);
    throw new ApiError('Invalid token', 401);
  }
};
// // Function to get userId from token
// const getUserIdFromToken = (req) => {
//   const token = req.cookies.token;
//   if (!token) throw new ApiError('No token provided', 401);
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     return decoded.userId;
//   } catch (err) {
//     throw new ApiError('Invalid token', 401);
//   }
// };


exports.getErrormodel = asyncHandler(async (req, res, next) => {
  const userId = getUserIdFromToken(req);
  try {
    const currentuser = await User.findOne({ _id: userId });
    if (!currentuser) {
      return next(new ApiError('currentuser not found', 404));
    }
    console.log("***** User from Aboutus id :" + userId + " *****");
    const role = currentuser.role
    console.log("***** User role Aboutus  :" + role + " *****");
    res.render('errormodel.ejs', {
      isUser: userId,
      isAdmin: role
    })
  } catch (error) {
    console.error(error);
    return next(new ApiError('Internal Server Error', 500));
  }
})
