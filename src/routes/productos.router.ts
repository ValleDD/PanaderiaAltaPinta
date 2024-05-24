import { Router } from "express"
import { createProduct, deleteProduct, productList } from "../controllers/productos.controller"


const productRouter = Router()

productRouter.get('/list', productList)

productRouter.post('/create', createProduct)
productRouter.delete('/delete/:idProducto', deleteProduct)

export default productRouter
