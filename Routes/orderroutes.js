
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
      const formdata = req.body.formdata;
          const items = req.body.productArray;
          const shippingAdress = {
            address: formdata.address,
            city: formdata.city,
            province: formdata.province,
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






    // try { 
    //     const id = req.id;
    //     const existing = await Orders.findOne({ user: id })
      
    //   if (!existing) {
    //     const formdata = req.body.formdata;
    //     const items = req.body.productArray;
    //     const shippingAdress = {
    //       address: formdata.address,
    //       city: formdata.city,
    //       province: formdata.province,
    //     };
    //     const totalAmount = items.reduce(
    //       (total, item) => total + (item.price * item.quantity),
    //       0,
    //     );
    //     const user = req.id;
    //     console.log(totalAmount);
    //     await Orders.create({ user:user, items, shippingAdress, totalAmount });
    //     console.log(req.body)
    //   }
    //   else {
    //     const products = req.body.productArray;
    //    products.forEach((p) => {
    //       const existingitem = existing.items.find(
    //         (pr) => pr.product.toString() == p.product.toString(),
    //       );
    //       if (existingitem) {
    //         existingitem.quantity += p.quantity;
    //       } else {
    //         existing.items.push(p);
    //       }
    //     });
    //      existing.totalAmount = existing.items.reduce(
    //        (total, item) => total + item.price * item.quantity,
    //        0,
    //      );
       
    //     await existing.save();
    //   }
    //     res.status(200).send({message:"success"})
    // } catch (err) {
    //     console.error(err)
    //     res.status(500).send("Internal Server Error")
    // }
    
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
    

    
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default routero;




