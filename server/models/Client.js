const mongoose = require("mongoose");

const clientModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    uniq: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
});
const Client = mongoose.model('user', clientModel)

module.exports= Client

