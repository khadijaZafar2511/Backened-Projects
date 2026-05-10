import express from "express"
import { postPayment } from "../Controller/payment.controller.js";

const routerpay = express.Router()

routerpay.post("/", postPayment)


export default routerpay;
