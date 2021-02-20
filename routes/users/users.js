const express = require("express");
const router = express.Router();
const axios = require("axios");
const {
  getAllUsers,
  signup,
  login,
  deleteUserByEmail,
  deleteUserByID,
  updateUserByID,
  updateUserByEmail,
  clearCookies,
  homePage,
  checkIfUser,
  logInUser,
  createUser,
} = require("./controller/userController");
const { checkSignupInputIsEmpty } = require("./lib/checkSignup");
const { checkSignupDataType } = require("./lib/checkSignupDataType");
const {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
} = require("./lib/checkLogin");


// create a new user
router.get("/create-user", createUser);

// log user in 
router.get("/login", logInUser);

// check if user info matches records
router.get("/home", checkIfUser);

// render home page
router.post("/home", homePage);

// create new user
router.post("/create-user", checkSignupInputIsEmpty, checkSignupDataType, signup);

// login
router.post("/login", checkLoginEmptyMiddleware, checkEmailFormat, login);

// delete user by id
router.delete("/delete-user-by-id/:id", deleteUserByID);

// delete user by email
router.delete("/delete-user-by-email", deleteUserByEmail);

// update user by id
router.put("/update-user-by-id/:id", updateUserByID);

// update user by email
// router.put("/update-user-by-email/:email", userController.updateUserByEmail);
router.put("/update-user-by-email/", updateUserByEmail);

// logout
router.get("/logout", clearCookies);



// export router
module.exports = router;