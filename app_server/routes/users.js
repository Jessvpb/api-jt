var express = require('express');
var router = express.Router();

const UserController = require("../controller/user");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/',UserController.signUp);

router.post("/login", UserController.login);


module.exports = router;
