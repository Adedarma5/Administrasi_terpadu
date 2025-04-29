
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Pengabdian = db.define('pengabdian', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    judul_pengabdian: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_dosen: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    mitra: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    bentuk_kegiatan: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    lokasi: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    tahun: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    file_kegiatan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Pengabdian;