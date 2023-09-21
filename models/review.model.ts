import mongoose from "mongoose";
export interface Review {
  _id: mongoose.Types.ObjectId;
  name: string;
  rating: number;
  description: string;
  user: mongoose.Types.ObjectId;
}
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.set("validateBeforeSave", true);
export default reviewSchema;
