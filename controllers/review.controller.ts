import mongoose from "mongoose";
import { EditReview } from "../types/edit-review.type";
import { NewReview } from "../types/new-review.type";
import { getCompanyById } from "./company.controller";

export const addReviewToCompany = async (newReview: NewReview, companyId: string) => {
    try {
      const { rating, description, name, userId } = newReview;
      const company = await getCompanyById(companyId);
  
      const review = {
        _id: new mongoose.Types.ObjectId(),
        rating,
        description: description ?? "",
        name: name ?? "Anonymous",
        user: userId,
      };
  
      company.reviews.push(review);
  
      await company.save();
      return review;
    } 
    catch (error) {
      throw error;
    }
  };
  
  export const editReviewOfCompany = async (editReview: EditReview, companyId: string, reviewId: string) => {
    try {
      const { name, description, rating } = editReview;
  
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
    } 
    catch (error) {
      throw error;
    }
  };