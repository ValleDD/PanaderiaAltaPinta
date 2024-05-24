import express, { json, urlencoded } from "express";  
import morgan from "morgan";
import cors from "cors";
import connectionBD from "./connection/connection";
//--import router

import productRouter from "./routes/productos.router";
import usuarioRouter from "./routes/usuarios.router";
import pedidoRouter from "./routes/pedido.router";
import detallePedidoRouter from "./routes/detallePedido.router";

const app = express();

//-config
app.set("port", process.env.PORT || 3001);

//--middlewares

// Morgan for logging HTTP requests
app.use(morgan("dev"));

// Cors middleware for handling Cross-Origin Resource Sharing
app.use(cors());

// Middleware to parse urlencoded body
app.use(urlencoded({ extended:false }));

// Middleware to parse JSON bodies
app.use(json());

//--connection to the database
connectionBD();

//--routes

// Default route for API
app.get("/api", (req, res) => {
    res.json("paanderia alta pinta");
});

// Routes for different entities
app.use("/api/product", productRouter); // Product routes
app.use("/api/user", usuarioRouter);    // User routes
app.use("/api/pedido", pedidoRouter);   // Order routes
app.use("/api/detalle", detallePedidoRouter); // Order detail routes

export default app;
