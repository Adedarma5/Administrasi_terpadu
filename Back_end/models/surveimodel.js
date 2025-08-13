import Sequelize from 'sequelize';
import db from "../config/database.js"

const { DataTypes } = Sequelize;

const Survei = db.define('survei', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  datajson: {
    type: DataTypes.JSON, 
    allowNull: false
  }
}, {
  tableName: 'survei',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

export default Survei;