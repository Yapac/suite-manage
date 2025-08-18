import mongoose from "mongoose";

const GuestSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  idDocument: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Guest", GuestSchema);
