import { register, login, logout } from "../Controller/auth.js"
import express from "express";

 
const routera = express.Router();

routera.post("/register", register)

routera.post("/login",login);

routera.post("/logout", logout);


export default routera;