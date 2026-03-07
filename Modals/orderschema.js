import mongoose from "mongoose";
const orderschema = ({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users"
       
    },
    items: [{
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Products"
            
        },
        name: String,
        price: Number,
        quantity:Number
    }],
    totalAmount: Number,
    status: {
        type:String,
        enum: ["pending", "paid", "shipped", "delivered"],
        default:"pending"
        
    }

})

const Orders = mongoose.model("Orders", orderschema);
export default Orders;
