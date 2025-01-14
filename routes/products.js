var express = require("express");
var router = express.Router();

const ProductController = require("../app_server/controller/product");
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

module.exports = router;
