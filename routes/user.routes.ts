import express, {Request, Response} from 'express';
import {signUp, logIn, logOut, validateNewUser} from '../controllers/user.controller'
import multer from "multer";
import {uploadImage} from '../controllers/upload.controller'
import { Directory } from '../enums/directory.enum';

const authRouter = express.Router();

const upload = multer({storage: multer.memoryStorage()})

authRouter.post('/signup', upload.single("file"), async (req: Request,res: Response) => {
    try{
        await validateNewUser(req.body.email, req.body.password);

        const url= await uploadImage(req.file, Directory.USER_DIRECTORY)

        const savedUser = await signUp({
            email: req.body.email,
            password: req.body.password,
            url
        });

        res.status(201).json(savedUser)
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
