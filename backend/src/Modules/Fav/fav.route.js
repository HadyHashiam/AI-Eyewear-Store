const router = require("express").Router({ mergeParams: true });
const bodyParser = require("body-parser");

const favController = require("./controller/fav.controller");

router.get('/favorites', favController.getFavs);

router.post(
    "/favorites",
    bodyParser.urlencoded({ extended: true }),
    favController.postFav
);
router.delete('/favorites/:productId', favController.deleteFav);

module.exports = router


// router.get("/", favController.createFilterObj, favController.getAllFavs);

// router.delete("/favorites/:productId", favController.deleteFav);




