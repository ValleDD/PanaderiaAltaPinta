import { Sequelize } from "sequelize-typescript";

export const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "mysql",
    database: "Panaderia",
    logging: false,
    models: []
})

async function connectionBD() {
    try {
        await connection.sync()
    } catch (error) {
        console.log("error: ", error)
    }
}