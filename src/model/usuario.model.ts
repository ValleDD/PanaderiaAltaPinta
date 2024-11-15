import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Pedido } from './pedido.model';


@Table({
    timestamps: false,  // Desactiva createdAt y updatedAt
})
export class Usuario extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    idUsuario!: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    nombre!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    correo_electronico!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    contraseña!: string;

    @Column({
        type: DataType.ENUM('panadero', 'cliente'),
        allowNull: false,
    })
    rol!: 'panadero' | 'cliente';

    @HasMany(() => Pedido)
    pedidos!: Pedido[];
}
