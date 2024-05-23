import express from "express";
import { ListOrder, createOrder, deleteOrder } from "../controllers/pedido.controller";


const detallePedidoRouter = express.Router();

// Ruta para obtener todos los detalles de un pedido
detallePedidoRouter.get("/lista", ListOrder);

// Ruta para crear un nuevo detalle de pedido
detallePedidoRouter.post("/crear", createOrder);

// Ruta para eliminar un detalle de pedido
detallePedidoRouter.delete("/eliminar:idDetallePedido",deleteOrder);

export default detallePedidoRouter;
