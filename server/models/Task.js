import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Task", TaskSchema);
