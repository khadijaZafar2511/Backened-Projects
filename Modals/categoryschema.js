import mongoose from "mongoose";

const categoryschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    }
})

const Category = mongoose.model("Category", categoryschema);
export default Category;