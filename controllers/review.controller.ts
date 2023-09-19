import mongoose from "mongoose";
import { EditReviewData } from "../types/edit-review-data.type";
import { ReviewData } from "../types/review-data.type";
import { getCompanyById } from "./company.controller";

export const addReviewToCompany = async (reviewData: ReviewData, companyId: string) => {
    try {
      const { rating, description, name, userId } = reviewData;
      const company = await getCompanyById(companyId);
  
      const newReview = {
        _id: new mongoose.Types.ObjectId(),
        rating,
        description: description ?? "",
        name: name ?? "Anonymous",
        user: userId,
      };
  
      company.reviews.push(newReview);
  
      await company.save();
      return newReview;
    } catch (error) {
      throw error;
    }
  };
  
  export const editReviewOfCompany = async (editReviewData: EditReviewData, companyId: string, reviewId: string) => {
    try {
      const { name, description, rating } = editReviewData;
  
      const company = await getCompanyById(companyId);
  
      const reviewToUpdate = company.reviews.find((review) =>
        review._id.equals(reviewId)
      );
  
      if (!reviewToUpdate) {
        throw new Error("Review not found in the company");
      }
  
      if (name) {
        reviewToUpdate.name = name;
      }
  
      if (description) {
        reviewToUpdate.description = description;
      }
  
      if (rating) {
        reviewToUpdate.rating = rating;
      }
  
      await company.save();
  
      return reviewToUpdate;
    } catch (error) {
      throw error;
    }
  };