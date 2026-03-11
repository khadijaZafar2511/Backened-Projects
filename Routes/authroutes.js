import express from "express";
import bcrypt from "bcrypt";
import registers from "../Modals/register.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const routera = express.Router();

// routera.get("/register", (req, res) => {
//   res.render()
// })
routera.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await registers.findOne({
            $or: [{name:name}, {email:email}]
        })
      if (existing) { return  res.status(400).send("user already exist")}
      const hashedpassword = await bcrypt.hash(password, 10);
             const ruser =await   registers.create({  name, email, password: hashedpassword, });
      if (ruser) {
        res.json(req.body);
      }
    } catch (err) {
        console.log(err)
        res.status(500).send({message:"error in registration"})
    }
})

routera.post("/login",async (req, res) => {
  try {
    const { email, password } = req.body;

    const usere = await registers.findOne({ email })
    if (!usere)  return res.status(400).send("user with this email is not exits")

    const isMatch = await bcrypt.compare(password, usere.password);
    if (!isMatch) return  res.status(400).send("password is wrong")
    
    const token = jwt.sign({ email }, process.env.SECRETE_KEY, { expiresIn: "1d" })

     res.cookie("token", token, {
        httpOnly: true,
        maxAge: 90000,
     });
    console.log(req.cookies.token)
    res.status(200).json({ message: "Login successful!" });


  } catch (err) {
       console.log(err);
       res.status(500).send({ message: err });
  }
});

routera.post("/logout", (req, res) => {
  try {
  } catch (err) {
       console.log(err);
       res.status(500).send({ message: err });
  }
});


export default routera;