import express from 'express';
import { actualizarProducto, crearProducto, eliminarProducto,  verProductos, verProductosDulces, verProductosSalados } from '../controllers/productos.controller';


const productoRouter = express.Router();

// Ruta para listar todos los productos, con posibilidad de filtrar por tipo
productoRouter.get("/list", verProductos);

// Ruta para crear un producto
productoRouter.post("/create", crearProducto);

// Ruta para actualizar un producto
productoRouter.put("/update/:id", actualizarProducto);

// Ruta para eliminar un producto
productoRouter.delete("/delete/:id", eliminarProducto);

productoRouter.get("/dulce", verProductosDulces);
productoRouter.get("/salado", verProductosSalados);

export default productoRouter;
