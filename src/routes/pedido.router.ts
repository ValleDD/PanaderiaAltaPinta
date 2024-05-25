import express from "express";
import { ListOrder, createOrder, deleteOrder, getPedidoById } from "../controllers/pedido.controller";

const pedidoRouter = express.Router();

// Route to get all orders
pedidoRouter.get("/list", ListOrder);

// Route to create a new order
pedidoRouter.post("/create", createOrder);

// Route to delete an order
pedidoRouter.delete("/delete:idPedido", deleteOrder);

// Route to get a pedido by id with details and products
pedidoRouter.get('/:id', getPedidoById);

export default pedidoRouter;

