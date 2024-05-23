import { Router } from "express"
import { ProductList, CreateProducts, DeleteProduct } from "../controllers/productos.controller"


const productRouter = Router()

productRouter.get('/lista', ProductList)

productRouter.post('/crea', CreateProducts)
productRouter.delete('/eliminar/:idProducto', DeleteProduct)

export default productRouter
