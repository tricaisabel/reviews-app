import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token= req.cookies.jwt;

    if(!token){
        return res.status(401).json({error: 'Please log in or sign up first'})
    }

    try
    {
        jwt.verify(token,`${process.env.JWT_SECRET}`)
        next();
    }
    catch(error)
    {
        res.status(400).json({error: 'Your token is invalid. Please log in or sign in'})
    }
    
}

export default authMiddleware;