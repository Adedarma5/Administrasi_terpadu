
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Rps = db.define('rps', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_rps:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Rps;