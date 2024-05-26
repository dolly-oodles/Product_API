import Product from "../Schemas/Product.schema.js";

export const createProduct = async (req,res) =>{
    try {
        const { itemName } = req.body;

        // Check if a product with the same itemName already exists
        const existingProduct = await Product.findOne({ itemName });
        
        if (existingProduct) {
            return res.status(409).send({ message: 'Product already exists' });
        }
        const newProduct = new Product(req.body);
       await newProduct.save();
       res.status(201).send(newProduct);

    } catch (error) {
        res.status(400).send(error); 
    }
}

export const getAllProducts = async(req,res)=>{
    try{
        const allProducts = await Product.find({});
        res.status(200).send(allProducts);
        if(!allProducts)
            res.status(404).send("No Product Found")

    }catch(error){
        res.status(400).send(error);
    }
}

export const getProductById = async(req,res) =>{
    try{
        const itemId = req.params.id;
        const product =await Product.findById(itemId);
        if(!product){
            res.status(404).send("No Such Product Found")
        }
        res.status(200).send(product); 
    }catch(error){
        res.status(400).send(error);
    }
}

export const deleteProductById = async(req,res) =>{
    try{
        const itemId = req.params.id;
        console.log(itemId)
        const deletedProduct =await Product.findByIdAndDelete(itemId);
        if(!deletedProduct){
            res.status(404).send("Product Not Found To Delete")
        }
        res.status(200).send(deletedProduct); 
    }catch(error){
        res.status(400).send(error);
    }
}

export const updateProductById = async(req,res) =>{
    try {
        const itemId = req.params.id;
        const item = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(itemId, item, { new: true });
        await updatedProduct.save();
        if(!updatedProduct)
        res.status(404).send("No Such Product Found To Update");
     
         res.status(200).send(updatedProduct);
        
    } catch (error) {
        res.status(400).send(error);
    }
}
