import { RequestHandler } from "express";
import { Usuario } from "../model/usuario.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Controlador para listar todos los usuarios
export const listUsers: RequestHandler = async (req, res) => {
    try {
        // Buscar todos los usuarios en la base de datos
        const usuarios = await Usuario.findAll();
        // Devolver una respuesta con los usuarios encontrados
        return res.status(200).json(usuarios);
    } catch (error) {
        //Devueve un error 
        return res.status(500).json({ message: "Hubo un error", error });
    }
};
// Controlador para listar todos los usuarios
export const createUser: RequestHandler = async (req, res) => {
    try {
        // Crear un nuevo usuario con la información proporcionada en el cuerpo de la solicitud
        await Usuario.create({ ...req.body });
        //Devuelve un mensaje con usuario creado
        return res.status(200).json({ message: "Usuario creado" });
    } catch (error) {
        //Devuelve un error 
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

// Controlador para eliminar un usuarios
export const deleteUser: RequestHandler = async (req, res) => {
    //Saca el idusuario de la peticion
    const { idUsuario } = req.params;
    try {
        //Elimina el usuario de la base de datos
        await Usuario.destroy({ where: { idUsuario: idUsuario } });
        return res.status(200).json({ message: "Usuario eliminado" });
    } catch (error) {
        //Devuelve el error que no se ha podido eliminar usuario
        return res.status(500).json({ message: "Hubo un error", error });
    }
};
// Controlador para login de usuario
export const loginUser: RequestHandler = async (req, res) => {
    //Saca de la peticion el correo y la contraseña
    const { correo_electronico, contrasena } = req.body;
    try {
        //Busca al usuario por el correo electronico
        const usuario = await Usuario.findOne({ where: { correo_electronico } });
        if (!usuario) {
            //manda error con usuario no encontrado 
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!isPasswordValid) {
            // Si la contraseña es incorrecta, devolver un error
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            // Payload del token con el ID y correo electrónico del usuario
            { id: usuario.idUsuario, email: usuario.correo_electronico },
             // Clave secreta para firmar el token (debería ser una clave secreta real en producción)
            'your_jwt_secret',
            // Expiración del token después de 1 hora
            { expiresIn: '1h' }
        );
         // Devolver un mensaje de éxito y el token JWT
        return res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
         // Devolver un mensaje de error 
        return res.status(500).json({ message: 'Hubo un error', error });
    }
};

