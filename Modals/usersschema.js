import mongoose from "mongoose";
const userschema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        unique:true
    }
})

const Users = mongoose.model("Users", userschema);
export default Users;