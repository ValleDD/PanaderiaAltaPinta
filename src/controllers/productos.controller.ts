import { Request, Response } from "express";
import { Productos } from "../model/productos.model";
import fs from "fs/promises"; // Using promises version of fs
import path from "path";
import multer from "multer"; // for handling file uploads

// Multer middleware for file upload
const upload = multer({
    dest: path.join(__dirname, "../public/uploads"), // Destination folder for file uploads
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
    }
}).single('imagen'); // Assuming the file field is named 'imagen'

// Controller to list all products
export const productList = async (req: any, res: any) => {
    try {
        const productos = await Productos.findAll();
        // Ensure each product has a valid id
        const productosConId = productos.map((producto, index) => {
            const plainProduct = producto.toJSON(); // Convert to plain object if necessary
            return {
                ...plainProduct,
                id: plainProduct.id ? plainProduct.id.toString() : index.toString(), // Ensure id is a string
            };
        });
        return res.status(200).json(productosConId);
    } catch (error) {
        console.error("An error occurred while listing products:", error);
        return res.status(500).json({ message: "An error occurred while listing products" });
    }
};

// Controller to create a new product
export const createProduct = async (req: Request, res: Response) => {
    upload(req, res, async (err: any) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { Nombre, descripcion, precio, tipo, idUsuario } = req.body;
        if (!Nombre || !descripcion || !precio || !tipo || !idUsuario) {
            return res.status(400).json({ message: "All fields are required" });
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

            await Productos.create({ Nombre, descripcion, precio, imagenURL, tipo, idUsuario });
            return res.status(201).json({ message: "Product created successfully" });
        } catch (error) {
            console.error("An error occurred while creating the product:", error);
            return res.status(500).json({ message: "An error occurred while creating the product" });
        }
    });
};

// Controller to delete an existing product
export const deleteProduct = async (req: Request, res: Response) => {
    const { idProducto } = req.params;

    try {
        const producto = await Productos.findByPk(idProducto);
        if (!producto) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (producto.imagenURL) {
            const rutaImagen = path.join(__dirname, `../public${producto.imagenURL}`);
            await fs.unlink(rutaImagen);
        }

        await producto.destroy();
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("An error occurred while deleting the product:", error);
        return res.status(500).json({ message: "An error occurred while deleting the product" });
    }
};

// Controller to modify an existing product
export const modifyProduct = async (req: Request, res: Response) => {
    upload(req, res, async (err: any) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }

        const { idProducto } = req.params;
        const { Nombre, descripcion, precio } = req.body;
        if (!Nombre || !descripcion || !precio) {
            return res.status(400).json({ message: "All fields are required" });
        }

        try {
            const producto = await Productos.findByPk(idProducto);
            if (!producto) {
                return res.status(404).json({ message: "Product not found" });
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
            return res.status(200).json({ message: "Product modified successfully" });
        } catch (error) {
            console.error("An error occurred while modifying the product:", error);
            return res.status(500).json({ message: "An error occurred while modifying the product" });
        }
    });
};

// Controller to list "sweet" type products
export const listSweets = async (req: Request, res: Response) => {
    try {
        const productos: Productos[] = await Productos.findAll({ where: { tipo: 'dulce' } });
        return res.status(200).json(productos);
    } catch (error) {
        console.error("An error occurred while listing sweet products:", error);
        return res.status(500).json({ message: "An error occurred while listing sweet products" });
    }
};

// Controller to list "salty" type products
export const listSalty = async (req: Request, res: Response) => {
    try {
        const productos: Productos[] = await Productos.findAll({ where: { tipo: 'salado' } });
        return res.status(200).json(productos);
    } catch (error) {
        console.error("An error occurred while listing salty products:", error);
        return res.status(500).json({ message: "An error occurred while listing salty products" });
    }
};
