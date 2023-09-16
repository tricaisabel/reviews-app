import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import Company from '../models/company'

const companyRouter = express.Router();

companyRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const companies = await Company.find().exec();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({error});
    }
});


companyRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
      const newCompany = new Company(req.body);
  
      const savedCompany = await newCompany.save();
  
      res.status(201).json(savedCompany); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
export default companyRouter;