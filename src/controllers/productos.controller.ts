import { Request, Response } from "express";
import { Productos } from "../model/productos.model";
import fs from "fs";
import path from "path";
import multer from "multer"; // Importa multer

// Configura multer para manejar la carga de archivos
const upload = multer({
    dest: path.join(__dirname, "../public/uploads") // Ruta donde se guardarán los archivos
});

export const listar = async (req: Request, res: Response) => {
    try {
        const productos: Productos[] = await Productos.findAll();
        return res.status(200).json(productos);
    } catch (error) {
        return res.status(500).json({ message: "Hubo un error", error });
    }
};

export const crear = async (req: Request, res: Response) => {
    const { Nombre, descripcion, precio } = req.body;

    try {
        let imagenURL = "";

        // Si se cargó un archivo de imagen en la solicitud
        if (req.file) {
            const extension = path.extname(req.file.originalname);
            const nombreImagen = `${Date.now()}${extension}`;
            const rutaImagen = path.join(__dirname, `../public/uploads/${nombreImagen}`);
            
            fs.renameSync(req.file.path, rutaImagen);
            imagenURL = `/uploads/${nombreImagen}`;
        }

        await Productos.create({ Nombre, descripcion, precio, imagenURL });

        return res.status(201).json({ message: "Producto creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        return res.status(500).json({ message: "Hubo un error al crear el producto", error });
    }
};

export const eliminar = async (req: Request, res: Response) => {
    const { idProducto } = req.params;

    try {
        const producto = await Productos.findByPk(idProducto);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (producto.imagenURL) {
            const rutaImagen = path.join(__dirname, `../public${producto.imagenURL}`);
            fs.unlinkSync(rutaImagen);
        }

        await producto.destroy();

        return res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        return res.status(500).json({ message: "Hubo un error al eliminar el producto", error });
    }
};

export const modificar = async (req: Request, res: Response) => {
    const { idProducto } = req.params;
    const { Nombre, descripcion, precio } = req.body;

    try {
        const producto = await Productos.findByPk(idProducto);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        let imagenURL = producto.imagenURL || "";

        // Si se cargó un nuevo archivo de imagen en la solicitud
        if (req.file) {
            const extension = path.extname(req.file.originalname);
            const nombreImagen = `${Date.now()}${extension}`;
            const rutaImagen = path.join(__dirname, `../public/uploads/${nombreImagen}`);

            fs.renameSync(req.file.path, rutaImagen);

            if (producto.imagenURL) {
                const rutaImagenAnterior = path.join(__dirname, `../public${producto.imagenURL}`);
                fs.unlinkSync(rutaImagenAnterior);
            }

            imagenURL = `/uploads/${nombreImagen}`;
        }

        await producto.update({ Nombre, descripcion, precio, imagenURL });

        return res.status(200).json({ message: "Producto modificado exitosamente" });
    } catch (error) {
        console.error("Error al modificar el producto:", error);
        return res.status(500).json({ message: "Hubo un error al modificar el producto", error });
    }
};
