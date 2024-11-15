import { Table, Column, Model, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { Usuario } from './usuario.model';

import { Detalles_Pedidos } from './detalles_Pedidos.model';

@Table({
    timestamps: false,  // Desactiva createdAt y updatedAt
})
export class Producto extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    idProducto!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    nombre!: string;

    @Column({
        type: DataType.TEXT,
    })
    descripcion!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    precio!: number;

    @Column({
        type: DataType.STRING(255),
    })
    imagenUrl!: string;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idUsuario!: number;

    @Column({
        type: DataType.ENUM('dulce', 'salado'),
        allowNull: false,
    })
    tipo!: 'dulce' | 'salado';

    @HasMany(() => Detalles_Pedidos)
    detallesPedido!: Detalles_Pedidos[];
}
