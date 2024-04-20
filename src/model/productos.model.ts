import { Column, Table, Model, DataType,ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./usuario.model";
import { Sequelize } from "sequelize";



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
