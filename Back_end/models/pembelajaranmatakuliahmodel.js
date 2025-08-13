
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const PembelajaranMataKuliah = db.define('pembelajaran_mata_kuliah', {
    id: {
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

    file_kontrak_kuliah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
     file_rps_pembelajaran:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default PembelajaranMataKuliah;