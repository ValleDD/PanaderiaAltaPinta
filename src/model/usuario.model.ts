import { Column, Table, Model, DataType, BeforeCreate } from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({
    timestamps: false,
    tableName: "usuario"
})
export class Usuario extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    idUsuario!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nombre!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    correo_electronico!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    contrasena!: string;

    @Column({
        type: DataType.ENUM('panadero', 'cliente'),
        allowNull: false
    })
    rol!: 'panadero' | 'cliente';

    // Hook para encriptar la contraseña antes de crear el usuario
    @BeforeCreate
    static async hashPassword(instance: Usuario) {
        const salt = await bcrypt.genSalt(10);
        instance.contrasena = await bcrypt.hash(instance.contrasena, salt);
    }

    // Método para validar la contraseña
    async validarContrasena(contrasena: string): Promise<boolean> {
        return await bcrypt.compare(contrasena, this.contrasena);
    }
}