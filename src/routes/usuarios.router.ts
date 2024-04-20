import { Router } from "express";
import { listarUsuarios, crearUsuario,eliminarUsuario } from "../controllers/usuarios.controller";

const usuarioRouter = Router();

usuarioRouter.get('/lista', listarUsuarios);
usuarioRouter.post('/crear', crearUsuario);
usuarioRouter.delete('/eliminar/:idUsuario', eliminarUsuario);

export default usuarioRouter;
