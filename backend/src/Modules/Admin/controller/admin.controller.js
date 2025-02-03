const { validationResult } = require("express-validator");
const Product = require('../../../../models/product.Model');

exports.getAddProduct = (req, res, next) => {
  res.render("addproduct", {
    isUser: true,
    isAdmin: true,
    pageTitle: "Add Product"
  });
};

exports.postAdd = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.redirect("/addproduct");
  }

  const productData = {
    code: req.body.code,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    image: req.file.filename,
    quantity: req.body.Quantity,
    face_shape: req.body.face_shape,
    face_shape_2: req.body.face_shape_2,
    face_shape_3: req.body.face_shape_3
  };

  Product.create(productData)
    .then(() => {
      res.redirect("/addproduct");
    })
    .catch(err => {
      console.error("Error adding product:", err);
      res.redirect("/error");
    });
};
