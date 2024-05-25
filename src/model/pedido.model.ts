import { Column, Table, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Usuario } from "./usuario.model"; // Import the Usuario model
import { Detalles_Pedidos } from "./detalles_Pedidos.model";



@Table({
    timestamps: false, // Disable timestamps for this table
    tableName: "pedidos" // Set the table name
})
export class Pedidos extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, // Define this column as the primary key
        autoIncrement: true // Enable auto-increment for this column
    })
    idPedidos!: number; // Define the type for the column

    @ForeignKey(() => Usuario) // Define foreign key relationship with Usuario table
    @Column({
        type: DataType.INTEGER,
        allowNull: false // Disallow null values for this column
    })
    cliente_id!: number; // Define the type for the column

    @BelongsTo(() => Usuario) // Define the association with the Usuario model
    cliente!: Usuario; // Define the property to access the associated Usuario

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW // Set the default value to the current date
    })
    fecha!: Date; // Define the type for the column

    @Column({
        type: DataType.STRING(50),
        allowNull: false // Disallow null values for this column
    })
    estado!: string; // Define the type for the column

    @HasMany(() => Detalles_Pedidos) // Define the association with Detalles_Pedidos model
    detalles!: Detalles_Pedidos[]; // Define the property to access associated Detalles_Pedidos
}

