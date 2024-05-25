import { RequestHandler } from "express";
import { Pedidos } from "../model/pedido.model";
import { Request, Response } from 'express';
import { Detalles_Pedidos } from "../model/detalles_Pedidos.model";
import { Productos } from "../model/productos.model";
import { connection } from "../connection/connection";



// Request handler to list all orders
export const ListOrder: RequestHandler = async (req, res) => {
    try {
        const order = await Pedidos.findAll(); // Fetch all orders
        return res.status(200).json(order); // Return the orders as JSON
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error }); // Handle error
    }
};




// Request handler to create a new order with details

interface DetallePedido {
    idProducto: number;
    cantidad: number;
}

export const createOrder: RequestHandler = async (req, res) => {
    const { detalles, ...pedidoData } = req.body;

    try {
        await connection.transaction(async (t) => {
            const pedido = await Pedidos.create(pedidoData, { transaction: t });

            const detallesConIdPedido = (detalles as DetallePedido[]).map((detalle) => ({
                ...detalle,
                pedido_id: pedido.id // Asignar el ID del pedido a cada detalle
            }));

            await Detalles_Pedidos.bulkCreate(detallesConIdPedido, { transaction: t });
        });

        return res.status(200).json({ message: "Order and details created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};



// Request handler to delete an order
export const deleteOrder: RequestHandler = async (req, res) => {
    const { idPedido } = req.params; // Extract the order ID from request parameters
    try {
        await Pedidos.destroy({ where: { idPedidos: idPedido } }); // Delete the order
        return res.status(200).json({ message: "Order deleted" }); // Return success message
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error }); // Handle error
    }
};
// Function to get a pedido by id with details and products
export const getPedidoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Get the id from request params
        const pedido = await Pedidos.findByPk(id, {
            include: [{
                model: Detalles_Pedidos,
                include: [Productos]
            }]
        });

        if (pedido) {
            res.status(200).json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};