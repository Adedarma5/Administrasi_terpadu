
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Absensi = db.define('absensi', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mata_kuliah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jam_pelajaran: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Absensi;