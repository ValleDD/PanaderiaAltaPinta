import express, { json,urlencoded } from "express";  
import morgan from "morgan";
import cors from "cors";
import connectionBD from "./connection/connection";
//--import router

import productRouter from "./routes/productos.router";
import usuarioRouter from "./routes/usuarios.router";

const app = express();

//-config

app.set("port", process.env.PORT || 3001)

//--middelswares
app.use(morgan("dev"))
app.use(cors())
app.use(urlencoded({ extended:false}))
app.use(json())

//--conexion
connectionBD()

//--routes
app.get("/api", (req, res) =>{res.json("paanderia alta pinta")})


app.use("/api/product",productRouter)
app.use("/api/user",usuarioRouter)
export default app

