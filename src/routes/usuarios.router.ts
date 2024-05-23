import { Router } from "express";
import {  createUser, deleteUser, listUsers, loginUser} from "../controllers/usuarios.controller";

const usuarioRouter = Router();

usuarioRouter.get('/lista', listUsers);
usuarioRouter.post('/crear', createUser);
usuarioRouter.delete('/eliminar/:idUsuario', deleteUser);
usuarioRouter.post('/login', loginUser); // Ruta pública
usuarioRouter.post('/register', createUser);


export default usuarioRouter;
