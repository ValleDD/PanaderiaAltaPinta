

import { Column, Table, Model, DataType,ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./usuario.model";

@Table({
    timestamps: false,
    tableName: "productos"
})

export class Productos extends Model{
    @Column({
        type: DataType.STRING,
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
        type: DataType.DECIMAL(10,2),
        allowNull: false
    })
    precio!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cantidad_disponible!: number;

    @ForeignKey(() => Usuario) // Define la clave externa para la relación
    @Column
    panadero_id!: number;

    @BelongsTo(() => Usuario) // Define la relación con el modelo de Usuario
    panadero!: Usuario;
}