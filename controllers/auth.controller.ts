import {Request, Response} from 'express'
import User from '../models/user.model'
import mongoose from 'mongoose'

const handleUserErrors = (err: any) => {
    // Duplicate email error
    if(err.code === 11000){
        return {
            email: {
                name: "UniqueError",
                message: "This email is already registered",
                kind: "unique",
                path: "email"
            }
        }
    }
    return err.errors;
}

export const signUp = async (req: Request, res: Response) => {
    try{
        const {email, password, url} = req.body
        const user = await User.create({
            _id: new mongoose.Types.ObjectId(),
            email,
            password,
            url
        })
        return res.status(201).json({
            message: "The user was added",
            email: user.email,
            url: user.url
        });
    }
    catch (error) {
        return res.status(400).json(handleUserErrors(error));
    }
}

export const logIn = (req: Request, res: Response) => {
    console.log('login')
}

export const logOut = (req: Request, res: Response) => {
    console.log('logout')
}