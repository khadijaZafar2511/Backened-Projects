import mongoose from "mongoose";

const loginschema =new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    password: {
        type: Number,
        required: true,
        unique:true
    }
})

const login = mongoose.model("login", loginschema)
export default login;