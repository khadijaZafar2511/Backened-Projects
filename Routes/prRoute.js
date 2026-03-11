import express from "express";
import Products from "../Modals/productschema.js"
import Cart from "../Modals/cartschema.js";
import Orders from "../Modals/orderschema.js";
import Category from "../Modals/categoryschema.js";
import Users from "../Modals/usersschema.js";
import { query } from "express-validator";
const router = express.Router();

//to get all products
router.get("/", async (req, res) => {
    try {
       
        const search = req.query.products || "";
        const query =  {
            $or: [
               
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }]
        } 
       console.log(query)
        const productd = await Products.find(query);
        console.log(query)
        res.json(productd);
    } catch (err) {
        console.log(err)
    }
});

router.get("/", async (req, res) => {
    try {

    } catch (err) {
        
    }
});


router.get("/", async (req, res) => {
  try {
  } catch (err) {}
});

router.get("/", async (req, res) => {
  try {
  } catch (err) {}
});

// router.post("/",async (req, res) => {
//     const productd1=Products.create(req.body)
//     res.json("post")
// })
export default router;