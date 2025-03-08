import Sequelize from 'sequelize';

const db = new Sequelize ('siatsi', 'root','',{
    host: "localhost",
    dialect: "mysql",
    timezone: "+07:00", 
    logging: false
});

export default db;