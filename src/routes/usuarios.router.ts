import { Router } from "express";
import {  createUser, deleteUser, listUsers, loginUser} from "../controllers/usuarios.controller";

const usuarioRouter = Router();

usuarioRouter.get('/list', listUsers);
usuarioRouter.post('/create', createUser);
usuarioRouter.delete('/delete/:idUsuario', deleteUser);
usuarioRouter.post('/login', loginUser); // Ruta pública
usuarioRouter.post('/register', createUser);


export default usuarioRouter;
