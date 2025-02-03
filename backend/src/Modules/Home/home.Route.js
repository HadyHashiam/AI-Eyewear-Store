const router = require("express").Router()

const homecontroller = require("./controller/home.controller")
const authService = require("../Auth/controller/auth.Controller")
router.use(authService.protect); // Protect all routes

router.get("/", homecontroller.getHomeWithCart)
router.get("/product", homecontroller.GetALLProducts)


module.exports = router