const router = require("express").Router()              // router level

const virtualTryOnController = require("./controller/virtualTryOn.controller")

router.post("/bestStyle", virtualTryOnController.postRunDetection)

module.exports = router
