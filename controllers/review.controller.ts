import Review from '../models/review.model'
import mongoose from 'mongoose'
import { checkCompanyExists, checkUserExists} from './user.controller'
import { ReviewData } from '../types/review-data.type'

export const createReview = async (reviewData: ReviewData)=>{
    try{
        const {rating,description,name,userId, companyId} = reviewData

        await checkUserExists(userId)
        await checkCompanyExists(companyId)

        const savedReview = await Review.create({
            _id: new mongoose.Types.ObjectId(),
            rating,
            description: description ?? "",
            name: name ?? "Anonymous",
            user: userId,
            company: companyId
        });
        return savedReview;
    }
    catch(error){
        throw error;
    }
}



