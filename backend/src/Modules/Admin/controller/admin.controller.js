

const { validationResult } = require("express-validator");
const Product = require('../../../../models/product.Model');
const ApiError = require('../../../../utils/apiError');

exports.getAddProduct = (req, res, next) => {
  res.render("addproduct", {
    isUser: true,
    isAdmin: true,
    pageTitle: "Add Product"
  });
};
exports.postAdd = (req, res, next) => {
  try {
    console.log("Received file:", req.file); // ✅ تحقق من استقبال الملف
    console.log("Received body:", req.body);

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }
    const image = req.file ? req.file.filename : null;

    const productData = {
      code: req.body.code,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: image, // حفظ اسم الملف فقط
      quantity: req.body.Quantity,
      face_shape: JSON.parse(req.body.face_shape || '[]'), // ✅ تحويل النص إلى array
    };

    Product.create(productData)
      .then(() => {
        res.json({
          message: "Add product page endpoint",

        });
      })
      .catch(err => {
        console.error("Error adding product:", err);
        res.redirect("/error");
      });
  } catch (error) {
    return next(new ApiError('Failed to add product', 500));
  }
};