import { RequestHandler } from "express";
import { Usuario } from "../model/usuario.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

// Controller to list all users
export const listUsers: RequestHandler = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};

// Validation middleware
export const validateUserCreation = [
    check('correo_electronico').isEmail().withMessage('Invalid email'),
    check('contrasena').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Controller to create a new user
export const createUser: RequestHandler = async (req, res) => {
    const { nombre, correo_electronico, contrasena, rol } = req.body;

    try {
        // Check if the email is already registered
        const existeUsuario = await Usuario.findOne({ where: { correo_electronico } });
        if (existeUsuario) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Validate the provided role
        if (!['panadero', 'cliente'].includes(rol)) {
            return res.status(400).json({ message: 'Provided role is not valid' });
        }

        // Create the new user
        const nuevoUsuario = await Usuario.create({
            nombre,
            correo_electronico,
            contrasena,
            rol // Assign the role provided by the client
        });

        // Return successful response
        return res.status(201).json({ message: 'User created successfully', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'An error occurred while creating the user', error });
    }
};

// Controller to delete a user
export const deleteUser: RequestHandler = async (req, res) => {
    const { idUsuario } = req.params;
    try {
        const result = await Usuario.destroy({ where: { idUsuario } });
        if (result === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};

// Controller to log in a user
export const loginUser: RequestHandler = async (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { correo_electronico } });
        if (!usuario) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await usuario.validarContrasena(contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign(
            { id: usuario.idUsuario, email: usuario.correo_electronico },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }
};
