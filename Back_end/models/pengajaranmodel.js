
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Pengajaran = db.define('pengajaran', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nama_dosen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mata_kuliah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelas: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    metode_pengajaran: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    keterlibatan_praktisi: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    nama_praktisi: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    institusi_praktisi: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    file_pengajaran: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Pengajaran;