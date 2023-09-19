import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.set("validateBeforeSave", true);
export default reviewSchema;
