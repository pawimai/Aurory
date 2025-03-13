import mongoose from "mongoose";

const Calendar = new mongoose.Schema({
  emotion: String,
  note: String,
  date: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Calendar", Calendar);
