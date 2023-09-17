import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: [true,"Please provide an email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
        minLength: [8, "Minimum password length is 8 characters"]
    },
    url:{ 
        type: String,
        required: true
    }
})

// hash password before an user is stored
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

const User = mongoose.model('User',userSchema) 
export default User;