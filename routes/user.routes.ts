import express, {Request, Response} from 'express';
import {signUp, logIn, logOut} from '../controllers/auth.controller'
import multer from "multer";
import {uploadImage} from '../controllers/upload.controller'
import dotenv from 'dotenv';
dotenv.config();

const authRouter = express.Router();

const upload = multer({storage: multer.memoryStorage()})



authRouter.post('/signup', upload.single("file"), async (req: Request,res: Response) => {
    const url = await uploadImage(req.file,"users")
    await signUp(req,res, url);
})

authRouter.post('/login',(req,res)=>{
    
})

authRouter.post('/logout',(req,res)=>{
    
})

export default authRouter
