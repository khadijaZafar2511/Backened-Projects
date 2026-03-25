import express from "express";
import { detproducts } from "../Controller/products.js";

const routerp = express.Router();

//to get all products
routerp.get("/", detproducts);

export default routerp;