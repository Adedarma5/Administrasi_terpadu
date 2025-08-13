
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Jurnal = db.define('jurnal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    penulis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    judul_jurnal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link_jurnal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tahun_terbit: {
        type: DataTypes.STRING,
        allowNull: false
    },
     volume: {
        type: DataTypes.STRING,
        allowNull: false
    },
    penerbit: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Jurnal;