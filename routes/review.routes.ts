import express, {Request, Response}  from "express";
import { addReviewToCompany, editReviewOfCompany } from "../controllers/review.controller";

const reviewRoutes = express.Router({mergeParams: true});

reviewRoutes.post("/", async (req: Request, res: Response): Promise<void> => {
    try {
      const {companyId} = req.params;
      const savedReview = await addReviewToCompany(req.body, companyId);
      res.status(201).json(savedReview);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  });

reviewRoutes.patch("/:reviewId", async (req: Request, res: Response): Promise<void> => {
    try {
      const {companyId, reviewId} = req.params;
      const savedReview = await editReviewOfCompany(req.body, companyId, reviewId);
      res.status(201).json(savedReview);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: message });
    }
  });

export default reviewRoutes;