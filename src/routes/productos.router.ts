import { Router } from "express"
import { listar, crear, eliminar } from "../controllers/productos.controller"

const productRouter = Router()

productRouter.get('/lista', listar)

productRouter.post('/crea', crear)
productRouter.delete('/eliminar/:idProducto', eliminar)

export default productRouter
