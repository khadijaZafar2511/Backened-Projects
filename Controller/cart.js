import Cart from "../Modals/cartitemschema.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const getCart= async (req,res) => { 
  try {
      console.log(req.id)
      const id =new ObjectId(req.id)
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
    const cart = await Cart.findOne({ user: id }).populate("cartitems.product")
    console.log(cart)
        if (cart) {
           return res.status(200).json(cart)
        } else {
           return res.status(404).send("cart is empty") 
        }
       
    } catch (err) {
        console.log(err)
        res.status(500).send("internal server error")
    }
}


const postCart=async (req, res) => {
   try {
      const { productid, quantity, billing } = req.body;
      const user = new ObjectId(req.id)
if (!mongoose.Types.ObjectId.isValid(user)) {
    return res.status(400).json({ message: "Invalid ID format" });
}
        const cart = await Cart.findOne({ user: user });
        console.log(cart)
        if (!cart) {
            const cartc = await Cart.create({
              user: user,
              cartitems: [{ product: productid, quantity: quantity }],
              billing:billing,
            }); 
        }
        else {
            const item = cart.cartitems.find(i => i.product.toString() === productid)  ///idd
           
            if (item) {
                item.quantity += 1;
                cart.billing+=billing
            }
            else {
                cart.cartitems.push({ product: productid, quantity: quantity });
                cart.billing+=billing
            }
            await cart.save()
        }
         res.json({ message: "success" });
    } catch (err) {
        console.error(err.stack)
        res.status(500).send("internal server err")
    }
}


const deleteCart=async (req, res) => {
    try {
            const user = new ObjectId(req.id);
            if (!mongoose.Types.ObjectId.isValid(user)) {
              return res.status(400).json({ message: "Invalid ID format" });
            }
      const deletecart =req.params.id; ;

        const cartdata = await Cart.findOne({ user: user }).populate("cartitems.product");
        if (cartdata) {
            const updatedarray = cartdata.cartitems.filter(
              (p) => p.product._id.toString() !== deletecart,
            );    

            const ditem = cartdata.cartitems.find(
                (i) => i.product._id.toString() === deletecart 
            );
            if (!ditem) {
                return res.status(404).send("cart not found")
            }

            const redbillling = ditem.product.price * ditem.quantity
            cartdata.cartitems = updatedarray;
            cartdata.billing = updatedarray.reduce((total, item) => total + (item.product.price * item.quantity), 0)
            
            let cart;
            await cartdata.save()
            return res.json({
                message: "success",
               cart:cartdata
            })
        }
        else {
          return  res.status(404).send("cart is empty")
        }
    } catch (err) {
        console.error(err)
        res.status(500).send("internal server error")
    }
 
}

const updateCart=async (req, res) => {
  try {
    const id = req.params.id;
    const { quantity } = req.body; 
      const user = new ObjectId(req.id);
      if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
    const updatecart = await Cart.findOne({ user: user }).populate(
      "cartitems.product",
    );

    if (!updatecart) return res.status(404).send("Cart not found");

    const updatedpr = updatecart.cartitems.find(
      (p) => p.product._id.toString() === id    //iddd
    );

    if (updatedpr) {
      updatedpr.quantity = quantity;
      updatecart.billing = updatecart.cartitems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);

        await updatecart.save();
      res.json({
        message: "success",
          updatecart
      });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}


export {getCart,postCart,deleteCart,updateCart}