const mongoose = require("mongoose");
let groups = new mongoose.Schema({
  groupname: {
    type: String,
    required: true,
  },
  groupadmin: {
      type: String,
    //   ref:"registeruser",
    required: true,
  },
  messages: {
    type: Array,
    // ref: "messagemodel",
  },
  users: {
    // type: [mongoose.Schema.Types.ObjectId],
    // ref: "registeruser",
    type: Array,
    required:true
      
  },
});
module.exports = mongoose.model("groups", groups); //first arg is model name,second is schema name
