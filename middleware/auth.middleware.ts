import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Please log in or sign up first" });
  }

  try {
    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (typeof decodedToken === "string" || !decodedToken.id) {
      throw new Error();
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error();
    }

    res.locals.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: "Your token is invalid" });
  }
};

export default authMiddleware;
