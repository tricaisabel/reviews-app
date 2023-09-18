import express, { Request, Response } from "express";
import { createReview } from "../controllers/review.controller";

const reviewRoutes = express.Router();

reviewRoutes.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const savedReview = await createReview(req.body);
    res.status(201).json(savedReview);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
});

export default reviewRoutes;
