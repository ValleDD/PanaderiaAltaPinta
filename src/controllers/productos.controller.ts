import { RequestHandler } from "express";
import { Productos } from "../model/productos.model";

export const listar: RequestHandler = async(req, res)=>{
    try {
        const product: Productos []= await Productos.findAll()
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", error})

    }
}

export const crear: RequestHandler = async(req, res)=>{
    try {
       await Productos.create({...req.body})
       return res.status(200).json({"message": "producto creado"});
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", error})

    }
}

export const eliminar: RequestHandler = async(req, res)=>{
    const {idProducto} = req.params
    try {
       await Productos.destroy({where: {idProducto:idProducto}})
       return res.status(200).json({"message": "producto eliminado"});
    } catch (error) {
        return res.status(500).json({"message": "Hubo un error", error})

    }
}