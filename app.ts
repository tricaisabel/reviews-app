import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import companyRouter from './routes/company'
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

try{
    if(process.env.MONGO_API_KEY){
        mongoose.connect(process.env.MONGO_API_KEY)
        console.log('Connected to MongoDB Atlas')
    }
    else{
        throw new Error('Missing MongoDB API Key')
    } 
}
catch(error){
    console.log(error)
}


app.use('/companies',companyRouter)

export default app;