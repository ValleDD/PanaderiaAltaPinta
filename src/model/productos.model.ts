
import { Column, Table, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Usuario } from "./usuario.model"; // Import the Usuario model
import { Detalles_Pedidos } from "./detalles_Pedidos.model";

@Table({
    timestamps: false, // Disable timestamps for this table
    tableName: "productos" // Set the table name
})
export class Productos extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, // Define this column as the primary key
        autoIncrement: true // Enable auto-increment for this column
    })
    idProducto!: number; // Define the type for the column

    @Column({
        type: DataType.STRING,
        allowNull: false // Disallow null values for this column
    })
    Nombre!: string; // Define the type for the column

    @Column({
        type: DataType.STRING,
        allowNull: false // Disallow null values for this column
    })
    descripcion!: string; // Define the type for the column

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false // Disallow null values for this column
    })
    precio!: number; // Define the type for the column

    @Column({
        type: DataType.STRING, 
        allowNull: true // Allow null values for this column
    })
    imagenURL!: string; // Define the type for the column

    @ForeignKey(() => Usuario) // Define foreign key relationship with Usuario table
    @Column({
        type: DataType.INTEGER,
        allowNull: false, // Disallow null values for this column
        field: 'idUsuario' // Specify the field name in the database
    })
    idUsuario!: number; // Define the type for the column

    @BelongsTo(() => Usuario, 'idUsuario') // Define the association with the Usuario model
    panadero!: Usuario; // Define the property to access the associated Usuario

    @Column({
        type: DataType.ENUM('dulce', 'salado'),
        allowNull: false // Disallow null values for this column
    })
    tipo!: 'dulce' | 'salado'; // Define the type for the column

    @HasMany(() => Detalles_Pedidos) // Define the association with Detalles_Pedidos model
    detalles!: Detalles_Pedidos[]; // Define the property to access associated Detalles_Pedidos
}