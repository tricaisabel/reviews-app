import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

import companyRoutes from './routes/company.routes'
import authRoutes from './routes/user.routes'
import reviewRoutes from './routes/review.routes';


const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

try{
    mongoose.connect(`${process.env.MONGO_API_KEY}`);
    console.log("Connected to MongoDB Atlas")
}
catch(error){
    console.log(error)
}

app.use('/companies',companyRoutes)
app.use('/auth',authRoutes)
app.use('/reviews',reviewRoutes)

export default app;