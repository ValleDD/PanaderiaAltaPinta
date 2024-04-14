import { Column, Table, Model, DataType } from "sequelize-typescript";

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
    contraseña!: string;
    @Column({
        type: DataType.ENUM('panadero', 'usuario'),
        allowNull: false
    })
    rol!: 'panadero' | 'usuario';
}
