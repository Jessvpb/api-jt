var express = require("express");
var router = express.Router();
//const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controller/product");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond dari CATEGORY router');
// });

//insert
router.post("/", ProductController.createProduct);

//select
router.get("/", ProductController.readProduct);

//delete
router.delete("/:kdProduct", ProductController.deleteProduct);

//update
router.put("/:kdProduct", ProductController.updateProduct);

// //insert
// router.post("/", checkAuth, ProductController.createProduct);

// //select
// router.get("/", checkAuth, ProductController.readProduct);

// //delete
// router.delete("/:kdProduct", checkAuth, ProductController.deleteProduct);

// //update
// router.put("/:kdProduct", checkAuth, ProductController.updateProduct);

module.exports = router;
