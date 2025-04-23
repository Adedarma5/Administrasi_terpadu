
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const KontrakKuliah = db.define('kontrak_kuliah', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

    file_kontrak_kuliah:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default KontrakKuliah;