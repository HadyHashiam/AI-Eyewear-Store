const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [20, 'Too short product description'],
    },

    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    Quantity: {
      type: Number,
      required: true,
      default: 1
    },
    face_shape: [],

  },
  {
    timestamps: true,

  }
);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;