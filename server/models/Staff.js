const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ["manager", "receptionist", "cleaning", "maintenance"],
    required: true,
  },
  email: String,
  phone: String,
  passwordHash: String,
  hireDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Staff", StaffSchema);
