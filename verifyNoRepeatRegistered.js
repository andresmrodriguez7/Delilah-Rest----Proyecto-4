let sequelize = require("./conexion")


let noRepeat = async(req, res, next) => {
    let usuario = req.body.usuario;
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let email = req.body.email;
    let telefono = req.body.telefono;
    let direccion = req.body.direccion;
    let contrasena = req.body.contrasena;
    let userList = await sequelize.query(`SELECT * FROM usuarios;`, { type: sequelize.QueryTypes.SELECT });
    let auxUser = userList.find(e => e.usuario == usuario || e.email == email || e.telefono == telefono || e.contrasena == contrasena)
    if (auxUser) {
        console.log("se quedó en la validación del middlewear");
        let respuesta = {
            response: "Forbidden",
            status: 403,
            description: `Error 403: Ops! Ya existe un usuario con alguna de esta información`,
        }
        res.json(respuesta);

    } else {
        next();
    }
}

module.exports = noRepeat;