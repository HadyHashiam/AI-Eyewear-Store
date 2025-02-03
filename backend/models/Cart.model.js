const mongoose = require("mongoose");
const { Schema } = mongoose;


const cartSchema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
  price: { type: Number },
  amount: { type: Number, default: 1 },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart;


