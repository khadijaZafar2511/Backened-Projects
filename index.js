import express from "express";
import cors from "cors";
import mongoconnect from "./Controller/mongo.js";
import router from "./Routes/prRoute.js";
import routera from "./Routes/authroutes.js";
import authm from "./Middleware/authmiddle.js";
import path from "node:path"
const app = express();
mongoconnect();

// midleware 
app.use(
  cors(),
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static((path.join(import.meta.dirname,"/Public"))))
//Routes
app.use("/auth", routera)
app.use(authm)
app.use("/ecomerence",router)


// port no
app.listen(process.env.PORT, (req,res) => {
    console.log("hello world");
})