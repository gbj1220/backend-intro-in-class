const { checkIfEmpty, checkIfEmail } = require('./authMethods');

function checkLoginEmptyMiddleware(req, res, next) {

  const errorObj = {};

  const checkedEmail = false;

  const { email, password } = req.body;

  if (checkIfEmpty(email)) {
    errorObj.email = "Email cannot be empty"
    checkedEmail = true;
  }

  if (checkIfEmpty(password)) {
    errorObj.email = "Email cannot be empty"
  }

  if (!checkedEmail) {
    if (!checkIfEmail(email)) {
      errorObj.email = "It must be in email format"
    }
  }

  // sending 
  if (Object.keys(errorObj).length > 0) {
    res.render("login");

  } else {
    next();
  }
}

function checkEmailFormat(req, res, next) {
  const { email } = req.body;
  const errorObj = {};

  if (!checkIfEmail(email)) {
    errorObj.email = "Must be in email format"
  }

  if (Object.keys(errorObj).length > 0) {
    res.render("login");

  } else {
    next();
  }
}

module.exports = {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
}

