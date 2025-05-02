
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Dosen = db.define('dosen', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    foto_dosen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    keahlian: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    jabatan_struktural: {
        type: DataTypes.STRING,
        allowNull: true,

    },

    jabatan_fungsional: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Dosen;