import express from "express";
import cors from "cors";
import mongoconnect from "./Controller/mongo.js";
import routerp from "./Routes/prRoute.js";
import routerc from "./Routes/cartroutes.js";
import routera from "./Routes/authroutes.js";
import routero from "./Routes/orderroutes.js"
import authm from "./Middleware/authmiddle.js";
import path from "node:path"
import cookieParser from "cookie-parser";
const app = express();
mongoconnect();

// midleware 
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin:"https://ecomerence-website-six.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  }),
);

// app.set("view engine","ejs")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static((path.join(import.meta.dirname,"/Public"))))
app.use(cookieParser())
//Routes


app.use("/auth", routera)

app.use("/ecomerence", routerp)
app.use(authm);
app.use("/cart", routerc)
app.use("/order", routero)

app.get("/me", (req, res,next) => {
  try { 
  if (req.id) {
    res.status(200).json({ id: req.id, email: req.email });
    next();
  } else res.status(404).send("null");
  
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal Server Error")
  }

})


// port no
const PORT =process.env.PORT || 3000 
app.listen(process.env.PORT, (req, res) => {
  console.log("hello world");
})

