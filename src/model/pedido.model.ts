import { Column, Table, Model, HasMany, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./usuario.model";
import { Detalles_Pedidos } from "./detallesPedidos.model";
@Table({
    timestamps: false,
    tableName: "pedidos"
})

export class Pedidos extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    idPedidos!: number;

    @ForeignKey(() => Usuario) // Define la clave externa para la relación con Usuario
    @Column
    cliente_id!: number;

    @BelongsTo(() => Usuario) // Define la relación con el modelo de Usuario
    cliente!: Usuario;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    fecha!: Date;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    estado!: string;

    @HasMany(() => Detalles_Pedidos)
    detallesPedidos!: Detalles_Pedidos[];
}
