const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  status: {
    type: String,
    enum: ["available", "occupied", "maintenance", "cleaning"],
    default: "available",
  },
  description: String,
});

module.exports = mongoose.model("Room", RoomSchema);
