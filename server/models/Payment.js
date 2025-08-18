import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: Number,
  method: { type: String, enum: ["cash", "card", "online"], required: true },
  paidAt: { type: Date, default: Date.now },
});

export default mongoose.model("Payment", PaymentSchema);
