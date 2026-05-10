
import express from "express";
import {
  getOrderItems,
  postOrderItems,
  updateOrder,
  deleteOrder,
} from "../Controller/order.controller.js";
const routero = express.Router();

routero.get("/", getOrderItems)

routero.post("/",postOrderItems)

routero.patch("/:id/cancel", updateOrder);

//  its temporary route work has to do on it

routero.delete("/", deleteOrder);

export default routero;



