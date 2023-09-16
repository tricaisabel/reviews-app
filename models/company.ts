import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    average:{
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
})

const User = mongoose.model('Company',companySchema) 
export default User;
