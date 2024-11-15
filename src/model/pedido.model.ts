import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Usuario } from './usuario.model';
import { Detalles_Pedidos } from './detalles_Pedidos.model';


@Table({
    timestamps: false,  // Desactiva createdAt y updatedAt
})
export class Pedido extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    idPedido!: number;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idCliente!: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    fecha!: Date;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    estado!: string;

    @BelongsTo(() => Usuario)
    cliente!: Usuario;

    @HasMany(() => Detalles_Pedidos)
    detallesPedido!: Detalles_Pedidos[];
}
