// this is the cookie cutter
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },

});
// exporting userSchema
module.exports = mongoose.model("user", userSchema);