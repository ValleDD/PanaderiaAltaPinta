import express from "express";
import { listardetailsorder,crearDetallePedido, eliminarDetallePedido } from "../controllers/detallesPedido.controller";

const detallePedidoRouter = express.Router();

// Ruta para obtener todos los detalles de un pedido
detallePedidoRouter.get("/lista", listardetailsorder);

// Ruta para crear un nuevo detalle de pedido
detallePedidoRouter.post("/crear", crearDetallePedido);

// Ruta para eliminar un detalle de pedido
detallePedidoRouter.delete("/eliminar:idDetallePedido",eliminarDetallePedido);

export default detallePedidoRouter;
