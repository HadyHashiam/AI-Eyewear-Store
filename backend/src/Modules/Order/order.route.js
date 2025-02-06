const router = require("express").Router({ mergeParams: true });
const bodyParser = require("body-parser");
const orderController = require("./controller/order.controller");

router.get("/orders", orderController.getOrder);
router.get("/deliveryDetails", orderController.getOrderVerify);

router.post("/checkout", (req, res, next) => {
  // console.log("Request body:", req.body);
  next();
}, orderController.postCheckout);


router.post("/webhook", (req, res, next) => {
  console.log("Convert req to RawBody for ../webhook");
  next();
},
  bodyParser.raw({ type: "application/json" }), // This keeps `req.body` as a Buffer  
  orderController.handleWebhook
);
router.delete(
  "/orders/cancel",
  bodyParser.urlencoded({ extended: true }),
  orderController.postCancel
);


module.exports = router;

// router.get("/deliveryDetails", orderController.getOrderVerify);
// router.get("/", orderController.createFilterObj, orderController.getAllOrders);

