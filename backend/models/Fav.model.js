const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
},
  { timestamps: true }
);

const FavoriteItem = mongoose.model("Favorite", FavoriteSchema);

module.exports = FavoriteItem;
