import express, { Request, Response , Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

if(process.env.MONGO_API_KEY){
    mongoose.connect(process.env.MONGO_API_KEY)
}

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

export default app;