
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Absensi = db.define('absensi', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    waktu_input:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CONVERT_TZ(NOW(), '+00:00', '+07:00')"), 
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Absensi;