import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const AbsensiPertemuan = db.define('absensi_pertemuan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    absensi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "absensi",
            key: "id"
        }
    },
    pertemuan: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default AbsensiPertemuan;