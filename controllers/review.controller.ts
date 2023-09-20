import mongoose from "mongoose";
import { NewReview } from "../types/new-review.type";
import { getCompanyById } from "./company.controller";
import { checkUserExists } from "./user.controller";

export const addReviewToCompany = async (
  newReview: NewReview,
  companyId: string,
  userId: string
) => {
  try {
    const { rating, description, name } = newReview;
    const company = await getCompanyById(companyId);

    const review = {
      _id: new mongoose.Types.ObjectId(),
      rating,
      description: description ?? null,
      name: name ?? "Anonymous",
      user: userId,
    };

    // check if user has already left a review to the company
    const userIds = company.reviews.map((review) => review.user._id.toString());
    if (userIds.includes(userId.toString())) {
      throw new Error("You already submitted a review to this company");
    }

    // add review
    company.reviews.unshift(review);

    // update company stats
    const currentPoint = company.averageRating * company.reviewCount;
    company.reviewCount++;
    const newAverageRating = (currentPoint + rating) / company.reviewCount;
    company.averageRating = parseFloat(newAverageRating.toFixed(2));

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
    const company = await getCompanyById(companyId);

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

export const getUserReview = async (companyId: string, userId: string) => {
  try {
    const company = await getCompanyById(companyId);
    await checkUserExists(userId);

    const userReviews = company.reviews.filter(
      (review) => review.user._id.toString() === userId
    );
    return userReviews[0];
  } catch (error) {
    throw error;
  }
};

export const getLatestReviews = async (
  companyId: string,
  userId: string,
  end: number
) => {
  try {
    const company = await getCompanyById(companyId);
    await checkUserExists(userId);

    const nonUserReviews = company.reviews.filter(
      (review) => review.user._id.toString() !== userId
    );

    if (end <= 0) {
      throw new Error(`Query parameter end must be greater than 0`);
    }

    return nonUserReviews.slice(0, end);
  } catch (error) {
    throw error;
  }
};
