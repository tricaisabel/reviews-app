import express, {Request, Response} from 'express';
import Company from '../models/company.model'

const companyRouter = express.Router();

companyRouter.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const companies = await Company.find().exec();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({error});
    }
});

export default companyRouter;