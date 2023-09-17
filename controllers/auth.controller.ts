import {Request, Response} from 'express'
import User from '../models/user.model'
import mongoose from 'mongoose'

export const signUp = async (req: Request, res: Response, url: string) => {
    const {email, password} = req.body;

    try{
        const userExists = await User.exists({email})
        if(userExists){
            return res.status(400).json({error: "An user with this email already exists"});
        }

        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            email,
            password,
            url
        })
        
        res.status(201).json({
            message: "The user was added",
            email: user.email,
            url: user.url
        });
    }catch(error){
        res.status(400).json(error);
    }
}

export const logIn = (req: Request, res: Response) => {
    console.log('login')
}

export const logOut = (req: Request, res: Response) => {
    console.log('logout')
}