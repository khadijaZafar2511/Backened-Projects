import mongoose from "mongoose";

const registerschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
     address: {
            type: String,
            required:true
    }
  },
  { timestamps: true },
);

const registers = mongoose.model("registers", registerschema)
export default registers;