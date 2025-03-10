var express = require("express");
var router = express.Router();
//const checkAuth = require("../middleware/check-auth");
const BrandController = require("../controller/brand");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond dari CATEGORY router');
// });

//insert
router.post("/", BrandController.createBrand);

//select
router.get("/", BrandController.readBrand);

//delete
router.delete("/:kdBrand", BrandController.deleteBrand);

//update
router.put("/:kdBrand", BrandController.updateBrand);

// //insert
// router.post("/", checkAuth, BrandController.createBrand);

// //select
// router.get("/", checkAuth, BrandController.readBrand);

// //delete
// router.delete("/:kdBrand", checkAuth, BrandController.deleteBrand);

// //update
// router.put("/:kdBrand", checkAuth, BrandController.updateBrand);

module.exports = router;
