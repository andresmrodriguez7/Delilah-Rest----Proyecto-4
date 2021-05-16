let noNullValue = (req, res, next) => {
    let usuario = req.body.usuario;
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let email = req.body.email;
    let telefono = req.body.telefono;
    let direccion = req.body.direccion;
    let contrasena = req.body.contrasena;

    if (usuario == '' || nombre == '' || apellidos == '' || email == '' || telefono == '' || direccion == '' || contrasena == '') {
        console.log("se quedó en la validación del middlewear");
        let respuesta = {
            response: "Bad Request",
            status: 400,
            description: `Error 400: Uy! Algo falta. Revisa que hayas ingresado toda la información solicitada!`,
        }
        res.json(respuesta);
    } else {
        next();
    }
}


module.exports = noNullValue;