import mongoose from "mongoose";
import reviewSchema from "./review.model";
import { Tags } from "../enums/tag.enum";
import { Colors } from "../enums/color.enum";

const productSchema = new mongoose.Schema({
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
  price:{
    type: Number,
    required: true
  },
  tags: [{
    type: String,
    enum: Object.values(Tags)
  }],
  color: {
    type: String,
    enum: Object.values(Colors)
  },
  discount:{
    type: Number,
    required: false
  },
  composition: {
    type: String,
    required: true
  }
});

productSchema.set("validateBeforeSave", true);

const Product = mongoose.model("Product", productSchema);
export default Product;
