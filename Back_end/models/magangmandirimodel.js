
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const MagangMandiri = db.define('magang_mandiri', {
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
    judul: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    nama_perusahaan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    tanggal_mulai: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    tanggal_selesai: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    sertifikat: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    konversi_nilai: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    laporan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default MagangMandiri;