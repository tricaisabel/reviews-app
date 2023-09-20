import mongoose from "mongoose";
import reviewSchema from "./review.model";

const companySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
});

companySchema.set("validateBeforeSave", true);

const Company = mongoose.model("Company", companySchema);
export default Company;
