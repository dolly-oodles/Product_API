import { Router } from 'express';
import { createProduct, deleteProductById, getProductById, getAllProducts, updateProductById } from "../Controllers/Product.controller.js"

const productRouter = Router();

productRouter.post('/createProduct',createProduct);

productRouter.get('/getproducts',getAllProducts);

productRouter.get('/getById/:id',getProductById);

productRouter.delete('/deleteproduct/:id',deleteProductById);

productRouter.put('/updateproduct/:id',updateProductById);

export default productRouter;
