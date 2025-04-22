
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Msib = db.define('msib', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nim: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    program: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    mitra: {
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
    lembar_pengesahan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    laporan: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    projek: {
        type: DataTypes.STRING,
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
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Msib;