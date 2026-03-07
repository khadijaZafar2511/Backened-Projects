import mongoose from "mongoose";

const registerschema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    password: {
        type:String,
        required: true,
    
    },
    email: {
        type: String,
        required: true,
        unique:true
    }
})

const registers = mongoose.model("registers", registerschema)
export default registers;