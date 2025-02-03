const router = require("express").Router()              // router level

const errormodelcontroller = require("./controller/errormodel.controller")



router.get("/errormodel", errormodelcontroller.getErrormodel)



module.exports = router
