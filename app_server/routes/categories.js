var express = require("express");
var router = express.Router();
const checkAuth = require("../middleware/check-auth");
const CategoryController = require("../controller/category");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond dari CATEGORY router');
// });

//insert
router.post("/", checkAuth, CategoryController.createCategory);

//select
router.get("/", checkAuth, CategoryController.readCategory);

//delete
router.delete("/:kdCategory", checkAuth, CategoryController.deleteCategory);

//update
router.put("/:kdCategory", checkAuth, CategoryController.updateCategory);

module.exports = router;
