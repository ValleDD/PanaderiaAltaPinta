import { Column, Table, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Pedidos } from "./pedido.model";
import { Productos } from "./productos.model";

@Table({
    timestamps: false, // Disable timestamps for this table
    tableName: "detalles_pedidos" // Set the table name
})
export class Detalles_Pedidos extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, // Define this column as the primary key
        autoIncrement: true // Enable auto-increment for this column
    })
    idDetalles_Pedido!: number; // Define the type for the column

    @ForeignKey(() => Pedidos) // Define foreign key relationship with Pedidos table
    @Column({
        type: DataType.INTEGER,
        allowNull: false // Disallow null values for this column
    })
    pedido_id!: number; // Define the type for the column

    @BelongsTo(() => Pedidos) // Define the association with the Pedidos model
    pedido!: Pedidos; // Define the property to access the associated Pedido

    @ForeignKey(() => Productos) // Define foreign key relationship with Productos table
    @Column({
        type: DataType.INTEGER,
        allowNull: false // Disallow null values for this column
    })
    idProducto!: number; // Define the type for the column

    @BelongsTo(() => Productos) // Define the association with the Productos model
    producto!: Productos; // Define the property to access the associated Producto

    @Column({
        type: DataType.INTEGER,
        allowNull: false // Disallow null values for this column
    })
    cantidad!: number; // Define the type for the column
}
