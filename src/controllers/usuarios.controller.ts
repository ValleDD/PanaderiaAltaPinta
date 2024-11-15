import { Usuario } from "../model/usuario.model";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


// Controlador para registrarse como usuario
export async function registrarUsuario(req: Request, res: Response) {
    try {
        // Obtener la contraseña del cuerpo de la solicitud
        const contraseña = req.body.contraseña;

        // Generar el hash de la contraseña
        const hashContraseña = await bcrypt.hash(contraseña, 10);

        // Crear un nuevo usuario con la contraseña encriptada
        const usuario = await Usuario.create({
            ...req.body,
            contraseña: hashContraseña
        });

        // Devolver el usuario creado como respuesta
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}



export async function iniciarSesion(req: Request, res: Response) {
  const { correo_electronico, contraseña } = req.body;

  try {
    console.log(`Iniciando sesión para: ${correo_electronico}`);

    // Buscar al usuario por su correo electrónico en la base de datos
    const usuario = await Usuario.findOne({ where: { correo_electronico } });

    if (!usuario) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isPasswordValid) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token de sesión
    const token = jwt.sign({ idUsuario: usuario.idUsuario }, 'secreto', { expiresIn: '1h' });

    console.log('Inicio de sesión exitoso');
    // Devolver el token como respuesta
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error del servidor:', error);
    res.status(500).json({ message: error });
  }
}


// Controlador para eliminar un usuario
export async function eliminarUsuario(req: Request, res: Response) {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) throw new Error('Usuario no encontrado');
        
        await usuario.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export async function listarUsuarios(req: Request, res: Response) {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
