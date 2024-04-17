import { Column, Table, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Pedidos } from "./pedido.model";
import { Productos } from "./productos.model";

@Table({
    timestamps: false,
    tableName: "detalles_pedidos"
})

export class Detalles_Pedidos extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    idDetalles_Pedido!: number;

    @ForeignKey(() => Pedidos) // Define la clave externa para la relación con Pedidos
    @Column
    pedido_id!: number;

    @BelongsTo(() => Pedidos) // Define la relación con el modelo de Pedidos
    pedido!: Pedidos;

    @ForeignKey(() => Productos) // Define la clave externa para la relación con Productos
    @Column
    producto_id!: number;

    @BelongsTo(() => Productos) // Define la relación con el modelo de Productos
    producto!: Productos;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cantidad!: number;
}
