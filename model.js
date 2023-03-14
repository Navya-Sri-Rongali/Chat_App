const mongoose = require("mongoose");
let registeruser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
  },
  groupsin: {
    type: Array,
    required: true
  }
});
module.exports = mongoose.model("registeruser", registeruser); //first arg is model name,second is schema name
