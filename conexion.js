const Sequelize = require('sequelize');
const path = 'mysql://root:camiloandres7@localhost:3306/acamica';
const sequelize = new Sequelize(path, { operatorAliases: false });
sequelize.authenticate().then(() => {
    console.log('conectado a la DB');
}).catch(err => {
    console.log('error de conexion a la BD', err)
});

module.exports = sequelize;