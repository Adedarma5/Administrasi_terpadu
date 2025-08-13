
import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const BahanAjar = db.define('bahan_ajar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    judul_materi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_pendukung: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pertemuan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pembelajaran_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "pembelajaran_mata_kuliah",
            key: "id"
        }
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

export default BahanAjar;