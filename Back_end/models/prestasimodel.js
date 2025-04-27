
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Prestasi = db.define('prestasi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nim: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    kategori_peserta: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    tingkatan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    nama_perlombaan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    bidang_perlombaan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    sertifikat: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Prestasi;