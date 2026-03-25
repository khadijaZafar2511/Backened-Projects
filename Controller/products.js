import Products from "../Modals/productschema.js"


const detproducts= async (req, res) => {
    try {
        const search = req.query.products || "";
        const query =  {
            $or: [
               
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }]
        } 
       console.log(query)
        const productd = await Products.find(query);
        console.log(query)
        res.json(productd);
    } catch (err) {
        console.log(err)
    }
}

export { detproducts };;