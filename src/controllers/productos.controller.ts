import { Request, Response } from "express";
import { Productos } from "../model/productos.model";
import fs from "fs";
import path from "path";
import multer from "multer"; //para el manejo de cargar archivos

const upload = multer({
    dest: path.join(__dirname, "../public/uploads") // Directorio de destino para subir archivos
});
// Controlador para listar todos los productos
export const ProductList = async (req: Request, res: Response) => {
    try {
     // Intentamos encontrar todos los productos en la base de datos
        const productos: Productos[] = await Productos.findAll();
        // Si se encuentran productos, los devolvemos en formato JSON con un estado de 200 (OK)
        return res.status(200).json(productos);
    } catch (error) {
         // Si ocurre un error al buscar los productos, lo devolvemos un mensaje de error con un estado de 500 (Internal Server Error)
        console.error("Hubo un error al listar los productos:", error);
        return res.status(500).json({ message: "Hubo un error al listar los productos" });
    }
};
// Controlador para crear un nuevo producto
export const CreateProducts = async (req: Request, res: Response) => {
     // Extraemos los datos del cuerpo de la solicitud
    const { Nombre, descripcion, precio } = req.body;
  // Verificamos que todos los campos requeridos estén presentes
    if (!Nombre || !descripcion || !precio) {
          // Si falta algún campo, respondemos con un estado de 400 (Bad Request) y un mensaje de error
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        let imagenURL = "";
         // Si hay un archivo adjunto en la solicitud, lo procesamos y guardamos su URL
        if (req.file) {
            const extension = path.extname(req.file.originalname);
            const nombreImagen = `${Date.now()}${extension}`;
            const rutaImagen = path.join(__dirname, `../public/uploads/${nombreImagen}`);
            
            fs.renameSync(req.file.path, rutaImagen);
            imagenURL = `/uploads/${nombreImagen}`;
        }
         // Creamos un nuevo producto en la base de datos con los datos proporcionados
        await Productos.create({ Nombre, descripcion, precio, imagenURL });
        // Respondemos con un estado de 201 (Created) y un mensaje de éxito
        return res.status(201).json({ message: "Producto creado exitosamente" });
    } catch (error) {
        console.error("Hubo un error al crear el producto:", error);
         /*Si ocurre un error al crear el producto, lo registramos en la consola y 
         devolvemos un mensaje de error con un estado de 500 (Internal Server Error)*/
        return res.status(500).json({ message: "Hubo un error al crear el producto" });
    }
};
// Controlador para eliminar un producto existente
export const DeleteProduct = async (req: Request, res: Response) => {
    // Extraemos el ID del producto de los parámetros de la solicitud
    const { idProducto } = req.params;

    try {
        // Intentamos encontrar el producto en la base de datos utilizando su ID
        const producto = await Productos.findByPk(idProducto);
        // Si el producto no existe, respondemos con un estado de 404 (Not Found) y un mensaje de error
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        // Si el producto tiene una URL de imagen, la eliminamos del sistema de archivos
        if (producto.imagenURL) {
            const rutaImagen = path.join(__dirname, `../public${producto.imagenURL}`);
            fs.unlinkSync(rutaImagen);
        }
        // Eliminamos el producto de la base de datos
        await producto.destroy();
         // Respondemos con un estado de 200 (OK) y un mensaje de éxito
        return res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Hubo un error al eliminar el producto:", error);
        // Si ocurre un error al eliminar el producto, lo registramos en la consola y devolvemos un mensaje de error con un estado de 500 (Internal Server Error)
        return res.status(500).json({ message: "Hubo un error al eliminar el producto" });
    }
};
// Controlador para modificar un producto existente
export const ModifyProduct = async (req: Request, res: Response) => {
    // Extraemos el ID del producto de los parámetros de la solicitud
    const { idProducto } = req.params;
    // Extraemos el ID del producto de los parámetros de la solicitud
    const { Nombre, descripcion, precio } = req.body;
    // Verificamos que todos los campos requeridos estén presentes
    if (!Nombre || !descripcion || !precio) {
        // Si falta algún campo, respondemos con un estado de 400 (Bad Request) y un mensaje de error
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        // Buscamos el producto en la base de datos utilizando su ID
        const producto = await Productos.findByPk(idProducto);
        // Si el producto no existe, manda un mensaje de error
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        let imagenURL = producto.imagenURL || "";
        // Si hay un archivo adjunto en la solicitud, lo procesamos y actualizamos la URL de la imagen
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
        // Actualizamos los datos del producto en la base de datos con los nuevos datos proporcionados
        await producto.update({ Nombre, descripcion, precio, imagenURL });
        // Respondemos con un estado de 200 (OK) y un mensaje de éxito
        return res.status(200).json({ message: "Producto modificado exitosamente" });
    } catch (error) {
        // Si ocurre un error al modificar el producto, devolvemos un mensaje de error con un estado de 500 (Internal Server Error)
        console.error("Hubo un error al modificar el producto:", error);
        return res.status(500).json({ message: "Hubo un error al modificar el producto" });
    }
};
// Controlador para listar los productos de tipo "dulce"
export const ListSweets = async (req: Request, res: Response) => {
    try {
         // Intentamos encontrar todos los productos de tipo "dulce" en la base de datos
        const productos: Productos[] = await Productos.findAll({ where: { tipo: 'dulce' } });
         // Devuelve los productos encontrados en formato JSON
        return res.status(200).json(productos);
    } catch (error) {
        //Devuelve un mensaje de error si no encuentra ningun producto tipo dulce
        console.error("Hubo un error al listar los productos dulces:", error);
        return res.status(500).json({ message: "Hubo un error al listar los productos dulces" });
    }
};
// Controlador para listar los productos de tipo "dulce"
export const ListSalty = async (req: Request, res: Response) => {
    try {
        // Intentamos encontrar todos los productos de tipo "salado" en la base de datos
        const productos: Productos[] = await Productos.findAll({ where: { tipo: 'salado' } });
         // Devuelve los productos encontrados en formato JSON
        return res.status(200).json(productos);
    } catch (error) {
        //Devuelve un mensaje de error si no encuentra ningun producto tipo salado
        console.error("Hubo un error al listar los productos salados:", error);
        return res.status(500).json({ message: "Hubo un error al listar los productos salados" });
    }
};