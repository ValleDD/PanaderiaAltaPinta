import { Column, Table, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Pedidos } from "./pedido.model";
import { Productos } from "./productos.model";

@Table({
    timestamps: false, // Deshabilita los timestamps para esta tabla
    tableName: "detalles_pedidos" // Establece el nombre de la tabla
})
export class Detalles_Pedidos extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, // Define esta columna como la clave primaria
        autoIncrement: true, // Habilita el autoincremento para esta columna
        allowNull: false, // No permitir valores nulos para esta columna
        defaultValue: DataType.INTEGER // Modifica el valor predeterminado para que sea NULL
    })
    idDetalles_Pedido!: number; // Define el tipo para la columna

    @ForeignKey(() => Pedidos) // Define la relación de clave externa con la tabla Pedidos
    @Column({
        type: DataType.INTEGER,
        allowNull: false // No permitir valores nulos para esta columna
    })
    pedido_id!: number; // Define el tipo para la columna

    @BelongsTo(() => Pedidos) // Define la asociación con el modelo Pedidos
    pedido!: Pedidos; // Define la propiedad para acceder al Pedido asociado

    @ForeignKey(() => Productos) // Define la relación de clave externa con la tabla Productos
    @Column({
        type: DataType.INTEGER,
        allowNull: false // No permitir valores nulos para esta columna
    })
    idProducto!: number; // Define el tipo para la columna

    @BelongsTo(() => Productos) // Define la asociación con el modelo Productos
    producto!: Productos; // Define la propiedad para acceder al Producto asociado

    @Column({
        type: DataType.INTEGER,
        allowNull: false // No permitir valores nulos para esta columna
    })
    cantidad!: number; // Define el tipo para la columna
}
