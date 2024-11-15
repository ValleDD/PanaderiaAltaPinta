import { Router } from "express";
import { eliminarUsuario, iniciarSesion, listarUsuarios, registrarUsuario } from "../controllers/usuarios.controller";


const usuarioRouter = Router();
usuarioRouter.get('/list', listarUsuarios);

// Route to create a new user
usuarioRouter.post('/registre', registrarUsuario);

// Route to delete a user
usuarioRouter.delete('/delete/:idUsuario', eliminarUsuario);

// Route to login (public route)
usuarioRouter.post('/login', iniciarSesion);



export default usuarioRouter;

