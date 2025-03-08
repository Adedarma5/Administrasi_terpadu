
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const BahanAjar = db.define('bahan_ajar', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    judul_materi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dosen_pengampu: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    pertemuan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    file_pendukung:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default BahanAjar;