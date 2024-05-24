import { RequestHandler } from "express";
import { Detalles_Pedidos } from "../model/detalles_Pedidos.model";

// Request handler to list all order details
export const listDetailsorder: RequestHandler = async (req, res) => {
    try {
        const detallesPedidos = await Detalles_Pedidos.findAll(); // Fetch all order details
        return res.status(200).json(detallesPedidos); // Return the order details as JSON
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error }); // Handle error
    }
};

// Request handler to create a new order detail
export const createOrderDetail: RequestHandler = async (req, res) => {
    try {
        await Detalles_Pedidos.create({ ...req.body }); // Create a new order detail
        return res.status(200).json({ message: "Order detail created" }); // Return success message
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error }); // Handle error
    }
};

// Request handler to delete an order detail
export const deleteOrderDetail: RequestHandler = async (req, res) => {
    const { idDetallePedido } = req.params; // Extract the order detail ID from request parameters
    try {
        await Detalles_Pedidos.destroy({ where: { idDetalles_Pedido: idDetallePedido } }); // Delete the order detail
        return res.status(200).json({ message: "Order detail deleted" }); // Return success message
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error }); // Handle error
    }
};
