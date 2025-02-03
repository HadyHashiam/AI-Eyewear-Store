const express = require("express");
const multer = require("multer");
const adminController = require("./controller/admin.controller");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Only .jpeg and .png files are allowed"), false);
    }
  }
});

router.get("/addproduct", adminController.getAddProduct);

router.post(
  "/addproduct",
  upload.single("image"),
  [
    check("name").not().isEmpty().withMessage("Name is required"),
    check("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isFloat({ min: 0.01 })
      .withMessage("Price must be greater than 0"),
    check("description").not().isEmpty().withMessage("Description is required"),
    check("category").not().isEmpty().withMessage("Category is required"),
    (req, res, next) => {
      if (!req.file) {
        return res.status(400).send("Image is required");
      }
      next();
    }
  ],
  adminController.postAdd
);
module.exports = router;
