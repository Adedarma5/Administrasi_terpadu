
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const TugasAkhir = db.define('tugas_akhir', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nim: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    no_hp: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    skripsi: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    program_tga: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    jurnal_sisfo: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default TugasAkhir;