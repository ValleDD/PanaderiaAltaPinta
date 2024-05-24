import express from "express";
import { ListOrder, createOrder, deleteOrder } from "../controllers/pedido.controller";

const detallePedidoRouter = express.Router();

// Route to get all order details
detallePedidoRouter.get("/list", ListOrder);

// Route to create a new order detail
detallePedidoRouter.post("/create", createOrder);

// Route to delete an order detail
detallePedidoRouter.delete("/delete:idDetallePedido", deleteOrder);

export default detallePedidoRouter;

