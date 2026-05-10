import express from "express";
import {
  getproducts,
  postProduct,
  productByCategory,
  deleteProduct,
} from "../Controller/products.js";

const routerp = express.Router();

//to get all products
routerp.get("/", getproducts);
routerp.post("/", postProduct);
routerp.get("/prByCategory", productByCategory);
routerp.delete("/", deleteProduct);
export default routerp;