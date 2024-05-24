import { RequestHandler } from "express";
import { Pedidos } from "../model/pedido.model";

// Request handler to list all orders
export const ListOrder: RequestHandler = async (req, res) => {
    try {
        const order = await Pedidos.findAll(); // Fetch all orders
        return res.status(200).json(order); // Return the orders as JSON
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error }); // Handle error
    }
};

// Request handler to create a new order
export const createOrder: RequestHandler = async (req, res) => {
    try {
        await Pedidos.create({ ...req.body }); // Create a new order
        return res.status(200).json({ message: "Order created" }); // Return success message
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error }); // Handle error
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
