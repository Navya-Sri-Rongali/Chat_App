const mongoose = require("mongoose");
let messagemodel = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  
  sendermesg: {
    type: String,
    required: true,
  },
  sendergroup: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("messagemodel", messagemodel); //first arg is model name,second is schema name
