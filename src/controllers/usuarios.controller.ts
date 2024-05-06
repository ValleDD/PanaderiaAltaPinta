import { RequestHandler } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

import { Usuario } from "../model/usuario.model";

export const listarUsuarios: RequestHandler = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const crearUsuario: RequestHandler = async (req, res) => {
    try {
        await Usuario.create({ ...req.body });
        return res.status(200).json({ message: "Usuario creado" });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const eliminarUsuario: RequestHandler = async (req, res) => {
    const { idUsuario } = req.params;
    try {
        await Usuario.destroy({ where: { idUsuario: idUsuario } });
        return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const iniciarSesion: RequestHandler = async (req, res) => {
    const { correo_electronico, contraseña } = req.body;

    try {
        // Buscar usuario por correo electrónico
        const usuario = await Usuario.findOne({ where: { correo_electronico } });

        if (!usuario) {
            return res.status(404).json({ message: "Correo electrónico no encontrado." });
        }

        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!contraseñaValida) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        // Generar token JWT
        const token = jwt.sign({ id: usuario.idUsuario, correo_electronico: usuario.correo_electronico }, "secreto", { expiresIn: "1h" });

        // Devolver token como respuesta
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
