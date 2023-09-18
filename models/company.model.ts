import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    url: {
        type: String,
        default: true
    }
})

companySchema.set('validateBeforeSave', true);

const Company = mongoose.model('Company',companySchema) 
export default Company;
