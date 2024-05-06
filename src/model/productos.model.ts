import { Column, Table, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./usuario.model";

@Table({
    timestamps: false,
    tableName: "productos"
})
export class Productos extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    idProducto!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    Nombre!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    descripcion!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    precio!: number;

    @Column({
        type: DataType.STRING, // Tipo de datos para la imagen, puede variar según tu base de datos
        allowNull: true // Permitir que la imagen sea opcional
    })
    imagenURL!: string; // Columna para almacenar la URL de la imagen

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        field: 'idUsuario' // Nombre real de la columna en la base de datos
    })
    idUsuario!: number;

    @BelongsTo(() => Usuario, 'idUsuario')
    panadero!: Usuario;
}

