import { RequestHandler } from "express";
import { Pedidos } from "../model/pedido.model";

export const ListOrder: RequestHandler = async (req, res) => {
    try {
        const order = await Pedidos.findAll();
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const createOrder: RequestHandler = async (req, res) => {
    try {
        await Pedidos.create({ ...req.body });
        return res.status(200).json({ message: "Pedido creado" });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const deleteOrder: RequestHandler = async (req, res) => {
    const { idPedido } = req.params;
    try {
        await Pedidos.destroy({ where: { idPedidos: idPedido } });
        return res.status(200).json({ message: "Pedido eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};
