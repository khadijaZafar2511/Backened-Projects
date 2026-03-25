import mongoose from "mongoose";
import registers from "../Modals/register.js";
const cartitemschema = new mongoose.Schema({
  
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
        required :true    
           },
  quantity: {
    type: Number,
    min: 1,
    default:1
          }
    
  
},{_id:false});


const cartschema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "registers",
    unique: true,
    required:true
  },
  cartitems: [cartitemschema],
  billing: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", cartschema);
export default Cart;