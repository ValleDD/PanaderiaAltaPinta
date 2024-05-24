import { Router } from "express";
import { createProduct, deleteProduct, listSalty, listSweets, modifyProduct, productList } from "../controllers/productos.controller";

const productRouter = Router();

// Route to get all products
productRouter.get('/list', productList);

// Route to create a new product
productRouter.post('/create', createProduct);

// Route to delete a product
productRouter.delete('/delete/:idProducto', deleteProduct);

// Route to modify a product
productRouter.put('/modify/:idProducto', modifyProduct);

// Route to get all sweet products
productRouter.get('/dulce', listSweets);

// Route to get all salty products
productRouter.get('/salado', listSalty);

export default productRouter;

