import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import companyRouter from './routes/companyRouter'
import uploadRouter from './routes/uploadRouter'

dotenv.config();
const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(`${process.env.MONGO_API_KEY}`);

app.use('/companies',companyRouter)
app.use('/images',uploadRouter)

export default app;