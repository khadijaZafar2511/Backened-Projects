import express from "express";
import cors from "cors";
import mongoconnect from "./Controller/mongo.js";
import router from "./Routes/prRoute.js";
import routera from "./Routes/authroutes.js";
import authm from "./Middleware/authmiddle.js";
import path from "node:path"
import cookieParser from "cookie-parser";
const app = express();
mongoconnect();

// midleware 
app.use(
  cors({
    origin: "https://ecomerence-website-six.vercel.app",
    credentials: true,
    sameSite: "none",
    secure: true,
  }),
);
// app.set("view engine","ejs")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static((path.join(import.meta.dirname,"/Public"))))
app.use(cookieParser())
//Routes
app.use("/auth", routera)
app.use(authm)
app.use("/ecomerence",router)


// port no
const PORT =process.env.PORT || 3000 
app.listen(process.env.PORT, (req, res) => {
  console.log("hello world");
})

