import express from "express";
import { crearPedido, eliminarPedido, verPedidos } from "../controllers/pedido.controller";


const pedidoRouter = express.Router();

//ver pedidos
pedidoRouter.get("/list", verPedidos);


// Route to create a new order
pedidoRouter.post("/create", crearPedido);

// Route to delete an order
pedidoRouter.delete("/delete:idPedido", eliminarPedido);



export default pedidoRouter;

