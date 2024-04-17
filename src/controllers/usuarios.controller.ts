import { RequestHandler } from "express";
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
