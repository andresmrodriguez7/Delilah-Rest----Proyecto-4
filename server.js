const { urlencoded } = require('body-parser');
const express = require('express');
const server = express();
server.use(express.json());
const port = 3000
server.use(express.static("public"));
const sequelize = require('./conexion');


server.listen(port, () => console.log(`Example app listening on port port!`));

// REGISTRAR/ACTUALIZAR USUARIOS ENDPOINTS

server.get('/usuarios', async(req, res) => {
    try {
        let userList = await sequelize.query(`SELECT * FROM usuarios;`, { type: sequelize.QueryTypes.SELECT });
        res.json(userList);
    } catch (error) {
        console.log(error);
    }
});

server.post('/usuarios', async(req, res) => {
    let usuario = req.body.usuario;
    let nombre = req.body.nombre;
    let email = req.body.email;
    let telefono = req.body.telefono;
    let direccion = req.body.direccion;
    let contrasena = req.body.contrasena;

    try {
        let newUser = await sequelize.query(`INSERT INTO usuarios (usuario, nombre, email, telefono, direccion, contrasena) VALUES ('${usuario}', '${nombre}', '${email}', '${telefono}', '${direccion}', '${contrasena}');`, { type: sequelize.QueryTypes.INSERT });
        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
});

server.put('/usuarios', async(req, res) => {
    let usuario = req.body.usuario;
    let nombre = req.body.nombre;
    let email = req.body.email;
    let telefono = req.body.telefono;
    let direccion = req.body.direccion;
    let contrasena = req.body.contrasena;
    try {
        let aux = await sequelize.query(`UPDATE usuarios SET usuario = "${usuario}", nombre = "${nombre}" WHERE id = ${req.query.id};`, { type: sequelize.QueryTypes.UPDATE });
        let updatedUser = await sequelize.query(`SELECT * FROM usuarios WHERE id = ${req.query.id};`, { type: sequelize.QueryTypes.SELECT });
        res.json(updatedUser);
    } catch (error) {
        console.log(error);
    }
});

server.delete('/usuarios/:id', async(req, res) => {
    let id = req.params.id;
    try {
        let deleted = await sequelize.query(`DELETE FROM usuarios WHERE id = ${id};`, { type: sequelize.QueryTypes.DELETE });
        console.log(deleted);
        res.json(deleted);
    } catch (error) {
        console.log(error);
    }
});

// LOGIN DEL PROYECTO

server.post("/login", async(req, res) => {
    console.log(req.body);
    let userMail = req.body.email;
    let password = req.body.contrasena;
    try {
        let userList = await sequelize.query(`SELECT * FROM usuarios`, { type: sequelize.QueryTypes.SELECT });
        let appUser = userList.find(e => e.contrasena == password && e.email == userMail)
            // console.log(appUser);

        if (appUser) {
            console.log("aqui");
            delete appUser.contrasena;
            delete appUser.telefono;
            let respuesta = {
                response: "OK",
                status: 200,
                description: "Usuario válido",
                body: appUser
            }
            res.json(respuesta);
        } else {
            let respuesta = {
                response: "Error",
                status: 404,
                description: "Ops! Usuario o contraseña incorrectas",
            }
            res.json(respuesta);
        }
    } catch (error) {
        console.log(error);
    }
})