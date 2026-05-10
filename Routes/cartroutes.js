import express from "express";
import mongoose from "mongoose";
import {
  getCart,
  postCart,
  deleteCart,
  updateCart,
} from "../Controller/cart.js";
const { ObjectId } = mongoose.Types;

const routerc = express.Router();
// get route
routerc.get("/", getCart);

//post route
routerc.post("/", postCart);

//delete route
routerc.delete("/:id", deleteCart);

//update cart
routerc.patch("/:id", updateCart);

export default routerc;
