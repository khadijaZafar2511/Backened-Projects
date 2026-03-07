import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default function mongoconnect() {

    mongoose
      .connect(`${process.env.MONGO_URL}ecomerence-crud`)
      .then(() => {
        console.log("database connected");
      })
      .catch((err) => {
        console.log(err);
      });
}

   

