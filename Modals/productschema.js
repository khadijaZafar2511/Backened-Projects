import mongoose  from "mongoose";

const prschema =new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags:[String],
  price: {
    type: Number,
    required: true,
  },
  images: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  stock: {
    type: Number,
    min:0
  },
  rating: {
    type:Number
  },
  warrantyInformation: {
    type:String
  }
});

const Products = mongoose.model("Products", prschema)

export default Products;