const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  idDocument: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Guest", GuestSchema);
