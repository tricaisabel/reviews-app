import express, { Request, Response } from "express";
import {
  addReviewToCompany,
  addDescriptionToReview,
  getUserReviews,
} from "../controllers/review.controller";

const reviewRoutes = express.Router({ mergeParams: true });

reviewRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const userId = res.locals.user._id;
    console.log(res.locals.user);

    const savedReview = await addReviewToCompany(req.body, companyId, userId);

    res.status(201).json(savedReview);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
});

reviewRoutes.get("/user-reviews", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();
    const { companyId } = req.params;

    const reviews = await getUserReviews(companyId, userId);

    res.status(200).json(reviews);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
});

reviewRoutes.patch("/:reviewId", async (req: Request, res: Response) => {
  try {
    const { companyId, reviewId } = req.params;
    const { description } = req.body;

    if (!description) {
      throw new Error("Please provide a description");
    }

    const savedReview = await addDescriptionToReview(
      description,
      companyId,
      reviewId
    );

    res.status(200).json(savedReview);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
});

export default reviewRoutes;
