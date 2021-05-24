const Sequelize = require('sequelize');
const mariadbUser = "root"
const mariadbPass = "camiloandres7"
const path = `mysql://${mariadbUser}:${mariadbPass}@localhost:3306/acamica`;
const sequelize = new Sequelize(path, { operatorAliases: false });
sequelize.authenticate().then(() => {
    console.log('conectado a la DB');
}).catch(err => {
    console.log('error de conexion a la BD', err)
});

module.exports = sequelize;