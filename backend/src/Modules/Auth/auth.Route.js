const express = require('express');
const router = express.Router();
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../../models/user.Model")
const createToken = require('../../../utils/createToken');
const jwt = require('jsonwebtoken');


const { signupValidator, loginValidator } = require('./authValidator');
const { postSignup, postlogin, forgotPassword, verifyPassResetCode, resetPassword, PostLogout, TestCookie } = require('./controller/auth.Controller');
const authService = require("../Auth/controller/auth.Controller");

// Routes for local authentication
router.post('/signup', postSignup);
router.post('/login', loginValidator, postlogin);
router.post('/logout', authService.protect, PostLogout);
router.get('/test-cookie', authService.protect, TestCookie);

router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', authService.protect, resetPassword);

module.exports = router;

// //  passport.use( new GoogleStrategy )

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback',
//   passReqToCallback: true
// }, async (req, accessToken, refreshToken, profile, done) => {
//   try {
//     // Find or create a user based on the Google profile
//     const user = await User.findOne({ googleId: profile.id });
//     if (!user) {
//       // Create a new user
//       const newUser = new User({
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         googleId: profile.id
//       });
//       await newUser.save();
//       const token = createToken(newUser._id);
//       done(null, { user: newUser, token });
//     } else {
//       // Return the existing user
//       const token = createToken(user._id);
//       done(null, { user, token });
//     }
//   } catch (err) {
//     console.error(err);
//     done(err, null);
//   }
// }));

// // Google Login Route
// router.get("/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// // Retrieve user data   and generate token
// router.get("/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     const user = req.user.user;
//     console.log("the user :" + user)
//     const token = createToken(user._id);
//     console.log("the token :" + token)
//     // 3) Set cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Set to true in production
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     });

//     console.log("**********************************************************************")
//     console.log("the cookie :" + res.session)

//     res.
//       redirect("/home");

//   })



// // Route if something goes wrong
// router.get('/login-failure', (req, res) => {
//   res.send('Something went wrong...');
// });





// // Presist user data after successful authentication
// passport.serializeUser(function (obj, done) {
//   done(null, obj.user.id);
// });

// // Retrieve user data from session.
// // Original Code
// // passport.deserializeUser(function (id, done) {
// //   User.findById(id, function (err, user) {
// //     done(err, user);
// //   });
// // });

// // New
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });








// // Routes for local authentication
// router.post('/signup', postSignup);
// router.post('/login', loginValidator, postlogin);
// // router.post('/logout', authService.protect, postlogout);
// router.post('/logout', (req, res, next) => {
//   try {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.status(500).json({ status: 'error', message: 'Failed to log out' });
//       }
//       res.clearCookie('token', { path: '/', httpOnly: true, sameSite: 'strict' });
//       res.status(200).json({ status: 'success', message: 'Logged out successfully' });
//     });
//   } catch (err) {
//     return next(new ApiError('Unexpected error during logout', 500));
//   }
// });


// router.get('/test-cookie', (req, res) => {
//   try {
//     const token = req.cookies.token;
//     console.log("req.session.user :", req.session.user)
//     console.log("req.headers.cookie :", req.headers.cookie)
//     if (!token) {
//       return res.status(401).json({ message: 'No token found in cookies' });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     const userId = decoded.userId;
//     res.json({ message: 'Token is valid', userId, token: token });
//   } catch (err) {
//     res.status(401).json({ message: 'Invalid token', error: err.message });
//   }
// });
// router.post('/forgotPassword', forgotPassword);
// router.post('/verifyResetCode', verifyPassResetCode);
// router.put('/resetPassword', authService.protect, resetPassword);

// module.exports = router;
