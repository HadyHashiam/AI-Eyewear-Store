const express = require('express');
const router = express.Router();

const {
  CreateProduct,
  GetALLProducts,
  GetSingleProduct,
  UpdateProduct,
  DeleteProduct
} = require('./controller/product.controller');


const authService = require('../Auth/controller/auth.Controller');

router.use(authService.protect);

router.post("/", authService.allowedTo('admin'), CreateProduct)

router.get('/', GetALLProducts)
router.get("/:id", authService.allowedTo('admin'), GetSingleProduct)
router.patch("/:id", authService.allowedTo('admin'), UpdateProduct)
router.delete("/:id", authService.allowedTo('admin'), DeleteProduct)

module.exports = router;