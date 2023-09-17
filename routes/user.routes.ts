import express, {Request, Response} from 'express';
import {signUp, logIn, logOut} from '../controllers/auth.controller'
import multer from "multer";
import {uploadImage} from '../controllers/upload.controller'
import dotenv from 'dotenv';
dotenv.config();

const authRouter = express.Router();

const upload = multer({storage: multer.memoryStorage()})



authRouter.post('/signup', upload.single("file"), async (req: Request,res: Response) => {
    req.body.url = `${process.env.DEFAULT_USER_IMAGE}`;

    try{
        if(req.file){
            req.body.url = await uploadImage(req.file,"users")
        }
        signUp(req,res);
    }
    catch(error){
        return res.status(400).json({error})
    }
})

authRouter.post('/login',(req,res)=>{
    
})

authRouter.post('/logout',(req,res)=>{
    
})

export default authRouter
