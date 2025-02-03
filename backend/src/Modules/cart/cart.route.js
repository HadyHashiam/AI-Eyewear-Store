const router = require("express").Router({ mergeParams: true });
const bodyParser = require("body-parser");
const cartController = require("./controller/cart.controller");
router.get("/cart", cartController.getCart);
router.post(
  "/cart",
  bodyParser.urlencoded({ extended: true }),
  cartController.createCartItem
);
router.patch(
  "/cart/save",
  bodyParser.urlencoded({ extended: true }),
  cartController.postSave
);

router.delete(
  "/cart/delete",
  bodyParser.urlencoded({ extended: true }),
  cartController.postDelete
);

module.exports = router;


// router.get("/", cartController.createFilterObj, cartController.getAllCarts);

// router.delete("/cart/:productId", cartController.removeItem);

