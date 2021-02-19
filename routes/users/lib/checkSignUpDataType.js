const { matches, isStrongPassword } = require("validator");
const { checkForSymbols, checkIfEmail }= require("./authMethods");


function ifContainsNumber (target) {
  if (matches(target, /[0-9]/g)) {
    return true;
  } else {
    return false;
  }
}

function checkSignupDataType(req, res, next) {

  let errorObj = {};

  const { firstName, lastName, email, password } = req.body;

  if (checkForSymbols(firstName)) {
    errorObj.firstName =
      "First Name cannot contains numbers and special characters";
  }

  if (checkForSymbols(lastName)) {
    errorObj.lastName =
      "Last Name cannot contains numbers and special characters";
  }


  if (ifContainsNumber(firstName)) {
    errorObj.firstName = 
    "First name cannot contain any special characters";
  }


  if (ifContainsNumber(lastName)) {
    errorObj.lastName = 
    "Last name cannot contain any special characters";
  }

  // if (!isStrongPassword(password)) {
  //   errorObj.password =
  //     "password must contain a minimum of 8 characters and must contain an uppercase, a lower case, a number and special character !@#$%^&*()<>{}";
  // }

  if (!checkIfEmail(email)) {
    errorObj.email = "Email must be in email format!";
  }

  if (Object.keys(errorObj).length > 0) {
    res.render("sign-up",{ error: errorObj, success: null });
  
    // res.status(500).json({
    //   message: "Error",
    //   data: errorObj,
    // });
    
  } else {
    next();
  }
};

module.exports = {
  checkSignupDataType,
};