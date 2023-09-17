import express, {Request, Response} from 'express';
import Review from '../models/review'
import Company from '../models/company'
import User from '../models/user'

const reviewRouter = express.Router();

reviewRouter.post('/reviews', async (req: Request, res: Response): Promise<void> => {
    try {
      const { rating, description, companyId, userId } = req.body;
  
      const companyExists = await Company.exists({ _id: companyId });
      const userExists = await User.exists({ _id: userId });
  
      if (!companyExists || !userExists) {
        res.status(400).json({ error: 'Company or User not found' });
        return;
      }
  
      const review = new Review({
        rating,
        description,
        companyId,
        userId,
      });
  
      const savedReview = await review.save();
  
      res.status(201).json(savedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default reviewRouter;