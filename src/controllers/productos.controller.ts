import { Request, Response } from "express";
import { Productos } from "../model/productos.model";
import fs from "fs/promises"; // Usar las versiones de promesas de fs
import path from "path";
import multer from "multer"; // para el manejo de cargar archivos

// Middleware de multer para cargar archivos
const upload = multer({
    dest: path.join(__dirname, "../public/"),
    limits: { fileSize: 2 * 1024 * 1024 }, // Limitar el tamaño del archivo a 2MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
    }
}).single('imagen'); // Asumiendo que el campo del archivo se llama 'imagen'

// Controlador para listar todos los productos
export const productList = async (req:any, res:any) => {
    try {
        const productos = await Productos.findAll();
        // Asegurarse de que cada producto tenga un id válido
        const productosConId = productos.map((producto, index) => {
            const plainProduct = producto.toJSON(); // Convertir a un objeto plano si es necesario
            return {
                ...plainProduct,
                id: plainProduct.id ? plainProduct.id.toString() : index.toString(), // Asegurarse de que el id sea una cadena
            };
        });
        return res.status(200).json(productosConId);
    } catch (error) {
        console.error("Hubo un error al listar los productos:", error);
        return res.status(500).json({ message: "Hubo un error al listar los productos" });
    }
};



// Controlador para crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
    upload(req, res, async (err: any) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { Nombre, descripcion, precio, tipo, idUsuario } = req.body;
        if (!Nombre || !descripcion || !precio || !tipo|| !idUsuario ) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        try {
            let imagenURL = "";
            if (req.file) {
                const extension = path.extname(req.file.originalname);
                const nombreImagen = `${Date.now()}${extension}`;
                const rutaImagen = path.join(__dirname, `../public/uploads/${nombreImagen}`);

                await fs.rename(req.file.path, rutaImagen);
                imagenURL = `/uploads/${nombreImagen}`;
            }

            // Verificar que los campos obligatorios estén presentes en la solicitud
            if (!Nombre || !descripcion || !precio || !tipo || !idUsuario) {
                return res.status(400).json({ message: "Todos los campos son requeridos" });
            }

            await Productos.create({ Nombre, descripcion, precio, imagenURL, tipo, idUsuario });
            return res.status(201).json({ message: "Producto creado exitosamente" });
        } catch (error) {
            console.error("Hubo un error al crear el producto:", error);
            return res.status(500).json({ message: "Hubo un error al crear el producto" });
        }
    });
};


// Controlador para eliminar un producto existente
export const deleteProduct = async (req: Request, res: Response) => {
    const { idProducto } = req.params;

    try {
        const producto = await Productos.findByPk(idProducto);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (producto.imagenURL) {
            const rutaImagen = path.join(__dirname, `../public${producto.imagenURL}`);
            await fs.unlink(rutaImagen);
        }

        await producto.destroy();
        return res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Hubo un error al eliminar el producto:", error);
        return res.status(500).json({ message: "Hubo un error al eliminar el producto" });
    }
};

// Controlador para modificar un producto existente
export const modifyProduct = async (req: Request, res: Response) => {
    upload(req, res, async (err: any) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { idProducto } = req.params;
        const { Nombre, descripcion, precio } = req.body;
        if (!Nombre || !descripcion || !precio) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        try {
            const producto = await Productos.findByPk(idProducto);
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            let imagenURL = producto.imagenURL || "";
            if (req.file) {
                const extension = path.extname(req.file.originalname);
                const nombreImagen = `${Date.now()}${extension}`;
                const rutaImagen = path.join(__dirname, `../public/uploads/${nombreImagen}`);

                await fs.rename(req.file.path, rutaImagen);

                if (producto.imagenURL) {
                    const rutaImagenAnterior = path.join(__dirname, `../public${producto.imagenURL}`);
                    await fs.unlink(rutaImagenAnterior);
                }

                imagenURL = `/uploads/${nombreImagen}`;
            }

            await producto.update({ Nombre, descripcion, precio, imagenURL });
            return res.status(200).json({ message: "Producto modificado exitosamente" });
        } catch (error) {
            console.error("Hubo un error al modificar el producto:", error);
            return res.status(500).json({ message: "Hubo un error al modificar el producto" });
        }
    });
};


// Controlador para listar los productos de tipo "dulce"
export const listSweets = async (req: Request, res: Response) => {
    try {
        const productos: Productos[] = await Productos.findAll({ where: { tipo: 'dulce' } });
        return res.status(200).json(productos);
    } catch (error) {
        console.error("Hubo un error al listar los productos dulces:", error);
        return res.status(500).json({ message: "Hubo un error al listar los productos dulces" });
    }
};

// Controlador para listar los productos de tipo "salado"
export const listSalty = async (req: Request, res: Response) => {
    try {
        const productos: Productos[] = await Productos.findAll({ where: { tipo: 'salado' } });
        return res.status(200).json(productos);
    } catch (error) {
        console.error("Hubo un error al listar los productos salados:", error);
        return res.status(500).json({ message: "Hubo un error al listar los productos salados" });
    }
};
