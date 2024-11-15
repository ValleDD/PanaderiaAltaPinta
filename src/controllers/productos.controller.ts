import { Producto } from "../model/productos.model";
import { Request, Response } from 'express';


// Controlador para crear un producto
export async function crearProducto(req: Request, res: Response) {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ message: error });
    }
}

// Controlador para actualizar un producto
export async function actualizarProducto(req: Request, res: Response) {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) throw new Error('Producto no encontrado');
        
        await producto.update(req.body);
        res.status(200).json(producto);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Controlador para eliminar un producto
export async function eliminarProducto(req: Request, res: Response) {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) throw new Error('Producto no encontrado');
        
        await producto.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Controlador para ver todos los productos
export async function verProductos(req: Request, res: Response) {
    try {
        // Obtener todos los productos de la base de datos
        const productos = await Producto.findAll();

        // Devolver los productos como respuesta
        res.status(200).json(productos);
    } catch (error) {
        // Manejar errores
        res.status(500).json({ message: error });
    }
}

// Controlador para ver los productos de tipo "dulce"
export async function verProductosDulces(req: Request, res: Response) {
    try {
        const productosDulces = await Producto.findAll({ where: { tipo: 'dulce' } });
        res.status(200).json(productosDulces);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// Controlador para ver los productos de tipo "salado"
export async function verProductosSalados(req: Request, res: Response) {
    try {
        const productosSalados = await Producto.findAll({ where: { tipo: 'salado' } });
        res.status(200).json(productosSalados);
    } catch (error) {
        res.status(500).json({ message: error});
    }
}