import { RequestHandler } from "express";
import { Usuario } from "../model/usuario.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

// Controlador para listar todos los usuarios
export const listUsers: RequestHandler = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

// Middleware de validación
export const validateUserCreation = [
    check('correo_electronico').isEmail().withMessage('Correo electrónico no válido'),
    check('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];


export const createUser: RequestHandler = async (req, res) => {
    const { nombre, correo_electronico, contrasena, rol } = req.body;
    try {
        const nuevoUsuario = await Usuario.create({ nombre, correo_electronico, contrasena, rol });
        return res.status(201).json({ message: "Usuario creado", usuario: nuevoUsuario });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};


// Controlador para eliminar un usuario
export const deleteUser: RequestHandler = async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const result = await Usuario.destroy({ where: { idUsuario } });
        if (result === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const loginUser: RequestHandler = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { correo_electronico } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const isPasswordValid = await usuario.validarContrasena(contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign(
            { id: usuario.idUsuario, email: usuario.correo_electronico },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );
        return res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error', error });
    }
};

