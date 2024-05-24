
import { Column, Table, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Usuario } from "./usuario.model";

@Table({
    timestamps: false,
    tableName: "pedidos"
})
export class Pedidos extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    idPedidos!: number;

    @ForeignKey(() => Usuario)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cliente_id!: number;

    @BelongsTo(() => Usuario)
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
}