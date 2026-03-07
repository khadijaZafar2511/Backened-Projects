import mongoose, { mongo } from "mongoose";

const prschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
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