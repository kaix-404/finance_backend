import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  type: { type: String, enum: ["income", "expense"] },
  category: String,
  date: Date,
  notes: String,
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

recordSchema.index({ type: 1 });
recordSchema.index({ category: 1 });
recordSchema.index({ date: -1 });

export default mongoose.model("Record", recordSchema);