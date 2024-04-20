import express from "express";
import { ListOrder, createOrder, deleteOrder } from "../controllers/pedido.controller";

const pedidoRouter = express.Router();

// Ruta para obtener todos los pedidos
pedidoRouter.get("/lista", ListOrder);

// Ruta para crear un nuevo pedido
pedidoRouter.post("/crear", createOrder);

// Ruta para eliminar un pedido
pedidoRouter.delete("/eliminar:idPedido", deleteOrder);

export default pedidoRouter;
