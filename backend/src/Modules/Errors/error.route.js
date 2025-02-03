const router = require("express").Router()              // router level


const Errorontroller = require("./controler/error.controller")
router.get("/error", Errorontroller.getError)


module.exports = router