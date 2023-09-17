import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 
    },
    description:{
        type: String,
    },
    name:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true
})

const Review = mongoose.model('Review',reviewSchema) 
export default Review;
