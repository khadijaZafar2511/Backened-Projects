
import express from "express";
import Orders from "../Modals/orderschema.js";
import registers from "../Modals/register.js";
const routero = express.Router();

routero.get("/", async(req, res) => {
    try { 

        const id = req.id;
        const orderdata = await Orders.find({ user: id }).populate("items.product", "images")
        console.log(orderdata)
        res.json(orderdata)
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error ")
    }
    
})

routero.post("/", async (req, res) => {

  try { 
    const id = req.id;
const user = await registers.findOne({_id:id})
    console.log(user);
    if (user) {

      const saveinfo = req.body.saveinfo;
          const items = req.body.productArray;
          const shippingAdress = {
            address: saveinfo.address,
            city: saveinfo.city,
            province: saveinfo.province,
          };
          const totalAmount = items.reduce(
            (total, item) => total + (item.price * item.quantity),
            0,
          );
          console.log(totalAmount);
          await Orders.create({ user:id, items, shippingAdress, totalAmount });
          console.log(req.body)
    }
  res.status(200).send({ message: "success" });


  } catch (err) {
    console.error(err)
    res.status(500).send("Internal Server Error")
  }

    
})

routero.patch("/:id/cancel", async (req, res) => {
  try {
      const iduser = req.id;
      const id = req.params.id;
    const order = await Orders.findOne({ _id: id, user: iduser })
    if (!order) {
      res.status(404).send("Order Not Found")
    }
    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending orders can be cancelled" });
    }
    order.status = "cancelled"
    await order.save();
    res.status(200).json({message:"success"})

    
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

//  its temporary route work has to do on it

routero.delete("/", async (req, res) => {
  try {
    const id = req.id;
    const deleteduser = await Orders.deleteMany({ user: id });
    if (deleteduser) {
      res.status(200).json({message:"deleted sucessfully"})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routero;



