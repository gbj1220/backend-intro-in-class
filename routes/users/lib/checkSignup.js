const { checkIfEmpty } = require('./authMethods')

const checkSignupInputIsEmpty = (req, res, next) => {

  let errorObj = {};

  const { firstName, lastName, email, password } = req.body;

  if (checkIfEmpty(firstName)) {
    errorObj.firstName = "First name cannot be empty"
  }

  if (checkIfEmpty(lastName)) {
    errorObj.lastName = "Last name cannot be empty"
  }

  if (checkIfEmpty(email)) {
    errorObj.email = "Email cannot be empty"

  }

  if (checkIfEmpty(password)) {
    errorObj.password = "Password cannot be empty"

  }

  if (Object.keys(errorObj).length > 0) {
    res.render("sign-up", { error: errorObj, success: null })

  } else {
    next();
  }
};

// go to the next function

module.exports = {
  checkSignupInputIsEmpty,
};