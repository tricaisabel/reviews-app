import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { setupMongoDB } from './database';
import cookieParser from 'cookie-parser';
import companyRoutes from './routes/company.routes'
import authRoutes from './routes/user.routes'
import authMiddleware from './middleware/auth.middleware';

const app: Application = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

setupMongoDB();

app.use('/companies', authMiddleware ,companyRoutes)
app.use('/auth',authRoutes)

export default app;