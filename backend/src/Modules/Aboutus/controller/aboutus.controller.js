
const ApiError = require('../../../../utils/apiError');
const asyncHandler = require('express-async-handler');

const jwt = require('jsonwebtoken');
const User = require('../../../../models/user.Model');





// Function to get userId from token
const getUserIdFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) throw new ApiError('No token provided', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded.userId;
  } catch (err) {
    throw new ApiError('Invalid token', 401);
  }
};







exports.getAboutus = asyncHandler(async (req, res, next) => {
  const userId = getUserIdFromToken(req);
  try {
    const currentuser = await User.findOne({ _id: userId });
    if (!currentuser) {
      return next(new ApiError('currentuser not found', 404));
    }
    console.log("***** User from Aboutus id :" + userId + " *****");
    const role = currentuser.role
    console.log("***** User role Aboutus  :" + role + " *****");

    res.render('aboutus.ejs', {
      isUser: userId,
      isAdmin: role
    })
  } catch (error) {
    console.error(error);
    return next(new ApiError('Internal Server Error', 500));
  }
})
