import express from "express";
import {  } from "../controllers/pedido.controller";
import { obtenerPedidosConProductos } from "../controllers/detallesPedido.controller";

const detallePedidoRouter = express.Router();

// Route to get all order details
detallePedidoRouter.get("/list", obtenerPedidosConProductos);



export default detallePedidoRouter;

