import User from '../models/user.model'
import mongoose, { ObjectId } from 'mongoose'
import { UserData } from '../types/user-data.type';
import Company from '../models/company.model';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

export const signUp = async (userData: UserData, url: string) => {
    const savedUser = await User.create({
        _id: new mongoose.Types.ObjectId(),
        email: userData.email,
        password: userData.password,
        url
    })
    return savedUser;
}

export const validateNewUser = async (userData: UserData): Promise<void>=>{
    const {email, password} = userData;
    const userExists = await User.exists({email})

    if(userExists){
        throw new Error('This email is already in use');
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: password,
        url: ''
    })

    await user.validate();
}

export const checkUserExists = async(userId: string): Promise<void>=>{
    if(!objectIdPattern.test(userId)){
        throw new Error('Please provide a valid ObjectId for userId')
    }
    
    let userExists = await User.exists({_id: userId})
    if(!userExists){
        throw new Error("User with given id doesn't exist")
    }
}

export const checkCompanyExists = async(companyId: string): Promise<void>=>{
    if(!objectIdPattern.test(companyId)){
        throw new Error('Please provide a valid ObjectId for companyId')
    }

    let companyExists = await Company.exists({_id: companyId})
    if(!companyExists){
        throw new Error("Company with given id doesn't exist")
    }
}

export const logIn = (req: Request, res: Response) => {
    console.log('login')
}

export const logOut = (req: Request, res: Response) => {
    console.log('logout')
}