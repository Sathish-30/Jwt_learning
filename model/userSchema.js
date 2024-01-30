import mongoose from "mongoose";

const User = new mongoose.Schema({
    email : {
        type:String,
        default:null
    },
    password : String,
    token : {
        type:String,
        default:null,
    }
});

export default mongoose.model("users", User)