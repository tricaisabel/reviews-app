import express, { Request, Response } from "express";
import {
  addReviewToCompany,
  addDescriptionToReview,
  getUserReview,
  getLatestReviews,
} from "../controllers/review.controller";
import { errorHandler } from "./errorHandler";

const reviewRoutes = express.Router({ mergeParams: true });

reviewRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const userId = res.locals.user._id;
    const userUrl = res.locals.user.url;

     await addReviewToCompany(req.body, companyId, userId, userUrl);

     res.status(201).send("Review added successfully");
  } catch (error) {
    errorHandler(error, res);
  }
});

reviewRoutes.get("/user", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();
    const { companyId } = req.params;

    const review = await getUserReview(companyId, userId);

    res.status(200).json({ review });
  } catch (error) {
    errorHandler(error, res);
  }
});

reviewRoutes.get("/latest", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user._id.toString();
    const { companyId } = req.params;
    const end = req.query.end?.toString() ?? "3";

    const reviews = await getLatestReviews(companyId, userId, parseInt(end));

    res.status(200).json({ reviews });
  } catch (error) {
    errorHandler(error, res);
  }
});

reviewRoutes.patch("/:reviewId", async (req: Request, res: Response) => {
  try {
    const { companyId, reviewId } = req.params;
    const { description } = req.body;

    if (!description) {
      throw new Error("Please provide a description");
    }

    await addDescriptionToReview(description, companyId, reviewId);

    res.status(200).send("Description added successfully");
  } catch (error) {
    errorHandler(error, res);
  }
});

export default reviewRoutes;
