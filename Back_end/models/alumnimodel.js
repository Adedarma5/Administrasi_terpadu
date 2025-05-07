import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Alumni = db.define('alumni', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_file: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    freezeTableName: true,
    timestamps: false,
});

export default Alumni;