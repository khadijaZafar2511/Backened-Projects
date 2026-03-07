import mongoose from "mongoose";

const cartschema = mongoose.Schema({
  cart: [
    {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
          quantity: Number
    }
  ]
});

const Cart = mongoose.model("Cart", cartschema);
export default Cart;
