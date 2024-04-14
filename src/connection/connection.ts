import { Sequelize } from 'sequelize-typescript';
import { Productos } from '../model/productos.model';

export const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "mysql",
    database: "Panaderia",
    logging: true,
    models: [
        Productos,
    ],
});

async function connectionBD() {
    try {
        await connection.sync();
        console.log("Conexión a la base de datos establecida correctamente.");
    } catch (error) {
        console.error("Error al sincronizar modelos:", error);
    }
}

export default connectionBD;
