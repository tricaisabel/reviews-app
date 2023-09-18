import express, {Request, Response} from 'express';
import {signUp, logIn, logOut, validateNewUser} from '../controllers/user.controller'
import multer from "multer";
import {uploadImage} from '../controllers/upload.controller'
import dotenv from 'dotenv';
import { DirectoryEnum } from '../enums/directory.enum';
dotenv.config();

const authRouter = express.Router();

const upload = multer({storage: multer.memoryStorage()})

authRouter.post('/signup', upload.single("file"), async (req: Request,res: Response) => {
    try{
        await validateNewUser(req.body);
        const url = await uploadImage(req.file, DirectoryEnum.USER_DIRECTORY)
        const savedUser = await signUp(req.body, url);

        res.status(201).json({
            email: savedUser.email,
            url: savedUser.url
        })
    }
    catch(error){
        const message = error instanceof Error ? error.message : "Unknown error";
        res.status(400).json({error: message})
    }
    
})

authRouter.post('/login',(req,res)=>{
    
})

authRouter.post('/logout',(req,res)=>{
    
})

export default authRouter
