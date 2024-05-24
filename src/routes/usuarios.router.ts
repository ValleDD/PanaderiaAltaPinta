import { Router } from "express";
import {  createUser, deleteUser, listUsers, loginUser } from "../controllers/usuarios.controller";

const usuarioRouter = Router();

// Route to get all users
usuarioRouter.get('/list', listUsers);

// Route to create a new user
usuarioRouter.post('/create', createUser);

// Route to delete a user
usuarioRouter.delete('/delete/:idUsuario', deleteUser);

// Route to login (public route)
usuarioRouter.post('/login', loginUser);

// Route to register (create a new user), duplicate with '/create' route
usuarioRouter.post('/register', createUser);

export default usuarioRouter;

