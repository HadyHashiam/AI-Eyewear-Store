const router = require("express").Router()              // router level

const aboutuscontroller = require("./controller/aboutus.controller")

router.get("/", aboutuscontroller.getAboutus)

module.exports = router
