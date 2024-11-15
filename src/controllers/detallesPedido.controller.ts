import { Detalles_Pedidos } from "../model/detalles_Pedidos.model";
import { Pedido } from "../model/pedido.model";
import { Producto } from "../model/productos.model";
import { Usuario } from "../model/usuario.model";
import { Request, Response } from 'express';

// Controlador para obtener los pedidos con sus productos y el ID del usuario
export async function obtenerPedidosConProductos(req: Request, res: Response) {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                {
                    model: Detalles_Pedidos,
                    include: [Producto]
                },
                Usuario
            ]
        });
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
