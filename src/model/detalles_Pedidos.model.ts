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

    @ForeignKey(() => Pedidos)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    pedido_id!: number;

    @BelongsTo(() => Pedidos)
    pedido!: Pedidos;

    @ForeignKey(() => Productos)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    idProducto!: number;

    @BelongsTo(() => Productos)
    producto!: Productos;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cantidad!: number;
}

