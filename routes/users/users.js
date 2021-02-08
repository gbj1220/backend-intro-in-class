// require in express
var express = require('express');
// require in express.router()
var router = express.Router();
// requiring in the data from userController.js file
const userController = require("./controller/userController")



router.get("/get-all-users", userController.getAllUsers);

router.post("/create-user", userController.signup);

router.delete("/delete-user-by-id/:id", userController.deleteUserByID);

router.delete("/delete-user-by-email", userController.deleteUserByEmail);

module.exports = router;



/* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });


// // V3 PROMISES
// router.post("/create-user", function (req, res) {
//   userController
//     .signup(req.body)
//     .then((createdUser) => {
//       res.status(200).json({
//         message: "User Created",
//         user: createdUser,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: error.message,
//       });
//     });
// });


// V2 CALLBACK
// router.post("/create-user", function (req, res) {
//   userController.signup(req.body, function (err, createdUser) {
//     if (err) {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: err.message
//       });
//     } else {
//       res.status(200).json({
//         message: "User Created",
//         user: createdUser,
//       });
//     }
//   });
// });


// OTHER VERSION
//v1
// router.post("/create-user", function (req, res) {
//   const createdUser = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//   });
//   createdUser.save(function (err, userCreated) {
//     if (err) {
//       res.status(400).json({
//         message: "ERROR",
//         errMessage: err.message,
//       });
//     } else {
//       res.status(200).json({
//         message: "User Created",
//         user: userCreated,
//       });
//     }
//   });
// });