import express, {Request, Response} from 'express';
import Review from '../models/review.model'
import Company from '../models/company.model'
import User from '../models/user.model'

const reviewRouter = express.Router();

reviewRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
      const { rating, description, companyId, userId } = req.body;
  
      const companyExists = await Company.exists({ _id: companyId });
      const userExists = await User.exists({ _id: userId });
  
      if (!companyExists) {
        res.status(400).json({ error: `Company with id ${companyId} does not exist` });
        return;
      }
  
      if(!userExists){
        res.status(400).json({ error: `User with id ${userId} does not exist` });
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
      res.status(500).json({ error});
    }
  });

export default reviewRouter;