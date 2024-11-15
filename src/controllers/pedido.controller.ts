import { Pedido } from "../model/pedido.model";
import { Request, Response } from 'express';

// Controlador para crear un pedido
export async function crearPedido(req: Request, res: Response) {
    try {
        const pedido = await Pedido.create(req.body);
        res.status(201).json(pedido);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// Controlador para eliminar un pedido
export async function eliminarPedido(req: Request, res: Response) {
    try {
        const pedido = await Pedido.findByPk(req.params.id);
        if (!pedido) throw new Error('Pedido no encontrado');
        
        await pedido.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ message: error });
    }
}
// Controlador para rehacer un pedido
export async function rehacerPedido(req: Request, res: Response) {
    // Lógica para recrear un pedido, por ejemplo, copiar los detalles de un pedido anterior y crear uno nuevo
}
// Controlador para ver todos los pedidos
export async function verPedidos(req: Request, res: Response) {
    try {
        // Obtener todos los pedidos de la base de datos
        const pedidos = await Pedido.findAll();

        // Devolver los pedidos como respuesta
        res.status(200).json(pedidos);
    } catch (error) {
        // Manejar errores
        res.status(500).json({ message: error });
    }
}