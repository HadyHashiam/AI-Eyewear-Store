const express = require("express");
const adminController = require("./controller/admin.controller");
const { uploadSingleImage, resizeImage } = require("../../middlewares/uploadImage");

const router = express.Router();

router.get("/addproduct", adminController.getAddProduct);

router.post(
  "/addproduct",
  uploadSingleImage("image"), // تحميل الصورة
  resizeImage, // تحجيم الصورة
  adminController.postAdd // إضافة المنتج إلى قاعدة البيانات
);

module.exports = router;
