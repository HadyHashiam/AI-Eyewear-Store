const express = require('express');
const { getUserValidator, createUserValidator, updateUserValidator, deleteUserValidator, changeUserPasswordValidator, updateLoggedUserValidator, } = require('./userValidator');
const { getUsers, getUser, createUser, updateUser, deleteUser, uploadUserImage, resizeImage, changeUserPassword, getLoggedUserData, updateLoggedUserPassword, updateLoggedUserData, deleteLoggedUserData, } = require('./controller/user.Controller');

const authService = require('../Auth/controller/auth.Controller');

const router = express.Router();

router.use(authService.protect);
const cartRouter = require('../cart/cart.route')
const favRouter = require('../Fav/fav.route')
const orderRouter = require('../Order/order.route')

router.use('/:id/cart', cartRouter)
router.use('/:id/fav', favRouter)
router.use('/:id/order', orderRouter)






router.get('/getMe', getLoggedUserData, getUser);
router.put('/changeMyPassword', updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserValidator, updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);

router.route('/')
  .get(getUsers)
  .post(uploadUserImage, resizeImage, createUserValidator, createUser);

router.route('/:id')
  .get(getUserValidator, getUser)
  .put(authService.protect, authService.allowedTo('admin'), uploadUserImage, resizeImage, updateUserValidator, updateUser)
  .delete(authService.protect, authService.allowedTo('admin'), deleteUserValidator, deleteUser);

router.put('/changePassword/:id', authService.protect, authService.allowedTo('admin'), changeUserPasswordValidator, changeUserPassword);

// Admin
router.use(authService.allowedTo('admin'));

module.exports = router;
