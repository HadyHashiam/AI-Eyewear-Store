const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  username: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  address: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  phone: String,
  email: String,
  title: String,
  image: String,
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  amount: Number,
  price: Number,
  total: Number,
  timestamp: Number,
  status: {
    type: String,
    default: "pending"
  },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
