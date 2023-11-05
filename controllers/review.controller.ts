import mongoose from "mongoose";
import { NewReview } from "../types/new-review.type";
import { getProductById } from "./product.controller";
import { checkUserExists } from "./user.controller";
import { DefaultImage } from "../enums/image.enum";

export const addReviewToProduct = async (
  newReview: NewReview,
  productId: string,
  userId: string,
  userUrl: string
) => {
  try {
    const { rating, description, name } = newReview;
    const product = await getProductById(productId);

    // check if user has already left a review to the product
    const userIds = product.reviews.map((review) => review.userId.toString());
    if (userIds.includes(userId.toString())) {
      throw new Error("You already submitted a review to this product");
    }

    // add review
    const review = {
      _id: new mongoose.Types.ObjectId(),
      rating,
      description: description ?? null,
      name: name === "" ? "Anonymous" : name,
      userId,
      userUrl: name === "" ? DefaultImage.USER : userUrl,
    };
    product.reviews.unshift(review);

    // update product stats
    const currentPoint = product.averageRating * product.reviewCount;
    product.reviewCount++;
    const newAverageRating = (currentPoint + rating) / product.reviewCount;
    product.averageRating = parseFloat(newAverageRating.toFixed(2));

    await product.save();
    return review;
  } catch (error) {
    throw error;
  }
};

export const addDescriptionToReview = async (
  description: string,
  productId: string,
  reviewId: string
) => {
  try {
    const product = await getProductById(productId);

    const reviewToUpdate = product.reviews.find((review) =>
      review._id.equals(reviewId)
    );

    if (!reviewToUpdate) {
      throw new Error("Review not found in the product");
    }

    reviewToUpdate.description = description;
    await product.save();

    return reviewToUpdate;
  } catch (error) {
    throw error;
  }
};

export const getUserReview = async (productId: string, userId: string) => {
  try {
    const product = await getProductById(productId);
    await checkUserExists(userId);

    const userReviews = product.reviews.filter(
      (review) => review.userId.toString() === userId
    );

    return userReviews[0] ?? null;
  } catch (error) {
    throw error;
  }
};

export const getLatestReviews = async (
  productId: string,
  userId: string,
  end: number
) => {
  try {
    const product = await getProductById(productId);
    await checkUserExists(userId);

    const nonUserReviews = product.reviews.filter(
      (review) => review.userId.toString() !== userId
    );

    if (end <= 0) {
      throw new Error(`Query parameter end must be greater than 0`);
    }

    return nonUserReviews.slice(0, end);
  } catch (error) {
    throw error;
  }
};
