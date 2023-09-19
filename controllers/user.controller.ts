import User from '../models/user.model'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { NewUser } from '../types/new-user.type';
import { LoginUser } from '../types/login-user.type';

export const oneDay = 24 * 60 * 60;

export const createToken = (id: string) => {
    const secret = `${process.env.JWT_SECRET}`
    return jwt.sign({id}, secret, {
        expiresIn: oneDay
    })
}

export const signUp = async (newUser: NewUser) => {
    const savedUser = await User.create({
        _id: new mongoose.Types.ObjectId(),
        email: newUser.email,
        password: newUser.password,
        url: newUser.url
    })

    return savedUser;
}

export const validateNewUser = async (email: string, password: string): Promise<void>=>{
    const emailExists = await User.exists({email})

    if(emailExists){
        throw new Error('This email is already in use');
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: password,
        url: 'url'
    })

    await user.validate();
}

export const checkUserExists = async(userId: string): Promise<void>=>{
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    if(!objectIdPattern.test(userId)){
        throw new Error('Please provide a valid ObjectId for userId')
    }
    
    let userExists = await User.exists({_id: userId})
    if(!userExists){
        throw new Error("User with given id doesn't exist")
    }
}

export const logIn = async (loginUser: LoginUser) => {
    const {email, password} = loginUser;
    
    const user = await User.findOne({email})
    if(!user){
        throw new Error();
    }

    const auth = await bcrypt.compare(password, user.password);
    if(!auth){
        throw new Error();
    }

    return user;
}