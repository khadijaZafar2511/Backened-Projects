import express from "express";
import bcrypt from "bcrypt";
import registers from "../Modals/register.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const register = async (req, res) => {
  try {
    const { firstname, lastname, email,password , role , address } = req.body;
    const existing = await registers.findOne({
      $or: [{ name: firstname }, { email: email }],
    });
    if (existing) {
      return res.status(400).send("user already exist");
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const ruser = await registers.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
      role,
      address,
    });
    if (ruser) {
      return res.json(req.body);
    }
    else {
      console.log("registrstion failed")
      return res.json("registration failed");
    } 
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "error in registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usere = await registers.findOne({ email });
    if (!usere)
      return res.status(400).send("user with this email is not exits");

    const isMatch = await bcrypt.compare(password, usere.password);
    if (!isMatch) return res.status(400).send("password is wrong");
    const id = usere._id;
    console.log(id)
    const token = jwt.sign({ email,id}, process.env.SECRETE_KEY, {
      expiresIn: "1d",
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Must be true for HTTPS/deployed
      sameSite: "none", // Must be "none" for cross-site cookies
      maxAge: 86400000,
    });
    // console.log(req.cookies.token)
    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};


const logout = (req, res) => {
    try {
        res.clearCookie();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

export { register, login, logout };