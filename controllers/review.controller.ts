import mongoose from "mongoose";
import { NewReview } from "../types/new-review.type";
import { checkCompanyExists } from "./company.controller";
import { checkUserExists } from "./user.controller";

export const addReviewToCompany = async (
  newReview: NewReview,
  companyId: string,
  userId: string
) => {
  try {
    const { rating, description, name } = newReview;
    const company = await checkCompanyExists(companyId);

    const review = {
      _id: new mongoose.Types.ObjectId(),
      rating,
      description: description ?? null,
      name: name ?? "Anonymous",
      user: userId,
    };

    company.reviews.unshift(review);

    const currentPoint = company.averageRating * company.reviewCount;
    company.reviewCount++;
    const newAverageRating = (currentPoint + rating) / company.reviewCount;
    company.averageRating = Math.round(newAverageRating * 100) / 100;

    await company.save();
    return review;
  } catch (error) {
    throw error;
  }
};

export const addDescriptionToReview = async (
  description: string,
  companyId: string,
  reviewId: string
) => {
  try {
    const company = await checkCompanyExists(companyId);

    const reviewToUpdate = company.reviews.find((review) =>
      review._id.equals(reviewId)
    );

    if (!reviewToUpdate) {
      throw new Error("Review not found in the company");
    }

    reviewToUpdate.description = description;
    await company.save();

    return reviewToUpdate;
  } catch (error) {
    throw error;
  }
};

export const getUserReviews = async (companyId: string, userId: string) => {
  try {
    const company = await checkCompanyExists(companyId);
    await checkUserExists(userId);

    const userReviews = company.reviews.filter(
      (review) => review.user._id.toString() === userId
    );
    return userReviews;
  } catch (error) {
    throw error;
  }
};
