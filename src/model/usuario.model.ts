import { Column, Table, Model, DataType, BeforeCreate } from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({
    timestamps: false, // Disable timestamps for this table
    tableName: "usuario" // Set the table name
})
export class Usuario extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true, // Define this column as the primary key
        autoIncrement: true // Enable auto-increment for this column
    })
    idUsuario!: number; // Define the type for the column

    @Column({
        type: DataType.STRING,
        allowNull: false // Disallow null values for this column
    })
    nombre!: string; // Define the type for the column

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true // Ensure uniqueness of values for this column
    })
    correo_electronico!: string; // Define the type for the column

    @Column({
        type: DataType.STRING,
        allowNull: false // Disallow null values for this column
    })
    contrasena!: string; // Define the type for the column

    @Column({
        type: DataType.ENUM('panadero', 'cliente'),
        allowNull: false // Disallow null values for this column
    })
    rol!: 'panadero' | 'cliente'; // Define the type for the column

    // Hook to hash the password before creating the user
    @BeforeCreate
    static async hashPassword(instance: Usuario) {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        instance.contrasena = await bcrypt.hash(instance.contrasena, salt); // Hash the password with the generated salt
    }

    // Method to validate the password
    async validarContrasena(contrasena: string): Promise<boolean> {
        return await bcrypt.compare(contrasena, this.contrasena); // Compare the provided password with the stored hashed password
    }
}
