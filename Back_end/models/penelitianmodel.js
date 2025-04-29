
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Penelitian = db.define('penelitian', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    judul_penelitian: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nama_dosen: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    ketua_tim: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    anggota_tim: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    file_laporan:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Penelitian;