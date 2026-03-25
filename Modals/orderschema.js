import mongoose from "mongoose";
const orderschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"registers"
       
    },
    items: [{
         _id: false,
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Products"
            
        },
        name: String,
        price: Number,
        quantity:Number
    }],
    shippingAdress: {
        address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    },
    totalAmount: Number,
    status: {
        type:String,
        enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
        default:"pending"
        
    }

},{timestamps:true})

const Orders = mongoose.model("Orders", orderschema);
export default Orders;
