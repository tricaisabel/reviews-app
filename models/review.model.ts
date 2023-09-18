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
        default: ""
    },
    name:{
        type: String,
        default: "Anonymous"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    }
},
{
    timestamps: true
})

reviewSchema.set('validateBeforeSave', true);

const Review = mongoose.model('Review',reviewSchema) 
export default Review;
