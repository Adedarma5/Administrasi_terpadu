
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const MataKuliah = db.define('mata_kuliah', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sks: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    semester: {
        type: DataTypes.STRING,
        allowNull: false,

    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default MataKuliah;