import { RequestHandler } from "express";
import { Detalles_Pedidos } from "../model/detalles_Pedidos.model";

export const listardetailsorder: RequestHandler = async (req, res) => {
    try {
        const detallesPedidos = await Detalles_Pedidos.findAll();
        return res.status(200).json(detallesPedidos);
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const crearDetallePedido: RequestHandler = async (req, res) => {
    try {
        await Detalles_Pedidos.create({ ...req.body });
        return res.status(200).json({ message: "Detalle de pedido creado" });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const eliminarDetallePedido: RequestHandler = async (req, res) => {
    const { idDetallePedido } = req.params;
    try {
        await Detalles_Pedidos.destroy({ where: { idDetalles_Pedido: idDetallePedido } });
        return res.status(200).json({ message: "Detalle de pedido eliminado" });
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};
