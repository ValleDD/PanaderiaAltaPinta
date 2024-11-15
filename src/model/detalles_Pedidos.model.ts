import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Pedido } from './pedido.model';
import { Producto } from './productos.model';


@Table({
    timestamps: false,  // Desactiva createdAt y updatedAt
})
export class Detalles_Pedidos extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    idDetallePedido!: number;

    @ForeignKey(() => Pedido)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idPedido!: number;

    @ForeignKey(() => Producto)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idProducto!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cantidad!: number;

    @BelongsTo(() => Pedido)
    pedido!: Pedido;

    @BelongsTo(() => Producto)
    producto!: Producto;
}
