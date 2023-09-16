import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatarLink:{ type: String}
})

const User = mongoose.model('User',userSchema) 
export default User;