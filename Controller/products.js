import Products from "../Modals/productschema.js"


const getproducts= async (req, res) => {
    try {
        const search = req.query.products || "";
        const query =  {
            $or: [
               
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }]
        } 
      
        const productd = await Products.find(query);
       
        res.json(productd);
    } catch (err) {
        console.log(err)
    }
}


const postProduct = async (req, res) => {
    const products = req.body;
    await Products.create(products);
    res.status(200).json("product added successfully")
}
const deleteProduct = async (req, res) => {
    const products = req.body;
    await Products.deleteMany({});
    res.status(200).json("product delted  successfully")
}

const productByCategory=async(req,res)=>{
    try {
        
       const category = req.query.category;
        
        let prByCategory;
    
            if (category === "Beauty & Personal Care") {
              prByCategory = await Products.find({
                category: {
                  $in: ["beauty", "fragrances", "skin-care", "sunglasses"],
                },
              });
            } else if (category === "Fashion & Apparel") {
              prByCategory = await Products.find({
                category: {
                  $in: [
                    "mens-shirts",
                    "mens-shoes",
                    "mens-watches",
                    "womens-bags",
                    "womens-dresses",
                    "womens-jewellery",
                    "womens-shoes",
                    "womens-watches",
                  ],
                },
              });
            } else if (category === "Consumer Electronics") {
              prByCategory = await Products.find({
                category: {
                  $in: [
                    "tablets",
                    "smartphones",
                    "motorcycle",
                    "mobile-accessories",
                    "kitchen-accessories",
                  ],
                },
              });
            } else if (category === "Home & Living") {
              prByCategory = await Products.find({
                category: {
                  $in: ["furniture",  "kitchen-accessories"],
                },
              });
            } else if (category === "Health & Wellness") {
              prByCategory = await Products.find({
                category: {
                  $in: [ "groceries", "kitchen-accessories"],
                },
              });
            } else {
              prByCategory = await Products.find({ });
            }
       
        res.status(200).json(prByCategory);
    } catch (err) {
        console.error(err)
        res.status(500).json("Internal Server Error")
    }
}
export { getproducts, postProduct, productByCategory, deleteProduct };