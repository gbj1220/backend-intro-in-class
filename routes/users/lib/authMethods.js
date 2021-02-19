const { matches, isEmpty, isEmail } = require("validator");

function checkForSymbols(target) {
  if (matches(target, /[!@#$%^&*()\[\],.?":;{}|<>]/g)) {
    return true;
  } else {
    return false;
  }
}

function checkIfEmpty(target) {
  if (isEmpty(target)) {
    return true;
  } else {
    return false;
  }
}


function checkIfEmail(target) {
  if (isEmail(target)) {
    return true;
  } else {
    return false;
  }
}


module.exports = {
  checkForSymbols,
  checkIfEmpty,
  checkIfEmail,
}