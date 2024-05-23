import express from "express";
import { ListOrder, createOrder, deleteOrder } from "../controllers/pedido.controller";

const pedidoRouter = express.Router();


pedidoRouter.get("/lista", ListOrder);


pedidoRouter.post("/crear", createOrder);


pedidoRouter.delete("/eliminar:idPedido", deleteOrder);

export default pedidoRouter;
