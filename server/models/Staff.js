import mongoose from "mongoose";

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

export default mongoose.model("Staff", StaffSchema);
