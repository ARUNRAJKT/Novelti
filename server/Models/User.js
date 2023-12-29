const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true,unique: true, },
  phone: { type: Number, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: false }, 
  country: { type: String, required: true },
  state: { type: String, required: true },
  zipcode: { type: Number, required: true }
});

const userModel = mongoose.model("user_tb", userSchema);
module.exports = userModel;
