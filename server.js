const { urlencoded } = require('body-parser');
const express = require('express');
const server = express();
const jwt = require('express-jwt');
server.use(express.json());
const port = 3000
server.use(express.static("public"));
const sequelize = require('./conexion');


server.listen(port, () => console.log(`Example app listening on port port!`));



// .unless({ path: ['/login', '/peliculas', ] }));


// RESPONDE LISTA DE USUARIOS ENDPOINTS

server.get('/usuarios', async(req, res) => {
    try {
        let userList = await sequelize.query(`SELECT * FROM usuarios;`, { type: sequelize.QueryTypes.SELECT });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Petición recibida y servida`,
            body: userList
        }
        res.json(respuesta);
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: `Error del servidor, vuelva a intentarlo mas tarde`,
            body: error
        }
        res.json(respuesta);
    }
});

//MIDDLEWEARS PARA EL REGISTRO
let noNullValue = require("./verifyNoNullValue");
let noRepeat = require("./verifyNoRepeatRegistered");

// REGISTRAR/ACTUALIZAR USUARIOS ENDPOINTS

server.post('/usuarios', noNullValue, noRepeat, async(req, res) => {
    let usuario = req.body.usuario;
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let email = req.body.email;
    let telefono = req.body.telefono;
    let direccion = req.body.direccion;
    let contrasena = req.body.contrasena;

    try {
        let newUser = await sequelize.query(`INSERT INTO usuarios (usuario, nombre, apellidos, email, telefono, direccion, contrasena) VALUES ('${usuario}', '${nombre}', '${apellidos}', '${email}', '${telefono}', '${direccion}', '${contrasena}');`, { type: sequelize.QueryTypes.INSERT });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Bienvenido a Delilah`,
            body: newUser
        }
        res.json(respuesta);
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: `Fallo en el servidor`,
        }
        res.json(respuestas)
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
        let respuesta = {
            response: "Ok",
            status: 200,
            description: "Bienvenido a Delilah Usuario creado exitosamente",
        }
        res.json(updatedUser);
    } catch (error) {
        console.log(error);
    }
});


// ELIMINAR USUARIOS ENDPOINTS

server.delete('/usuarios/:id', async(req, res) => {
    let id = req.params.id;
    try {
        let deleted = await sequelize.query(`DELETE FROM usuarios WHERE id = ${id};`, { type: sequelize.QueryTypes.DELETE });
        console.log(deleted);
        let respuesta = {
            response: "Ok",
            status: 200,
            description: "Usuario eliminado exitosamente",
        }
        res.json(respuesta);
    } catch (error) {
        console.log(error);
    }
});

// LOGIN DEL PROYECTO

server.post("/login", async(req, res) => {
    console.log(req.body);
    let userMail = req.body.email;
    let password = req.body.contrasena;
    if (userMail == "admin@delilah.com" && password == "admin") {
        let respuesta = {
            response: "OK",
            status: 100,
            description: "Ingreso de Administrador",
        }
        res.json(respuesta);
    } else {
        try {
            let userList = await sequelize.query(`SELECT * FROM usuarios`, { type: sequelize.QueryTypes.SELECT });
            let appUser = userList.find(e => e.contrasena == password && e.email == userMail)
            if (appUser) {
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
    }
});

// RESPONDE LISTA DE PRODUCTOS REGISTRADOS ENDPOINTS

server.get('/productos', async(req, res) => {
    try {
        let productList = await sequelize.query(`SELECT * FROM productos;`, { type: sequelize.QueryTypes.SELECT });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Petición recibida y servida`,
            body: productList
        }
        res.json(respuesta);
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: `Error del servidor, vuelva a intentarlo mas tarde`,
            body: error
        }
        res.json(respuesta);
    }
});

// REGISTRA NUEVOS PRODUCTOS EN LA BASE DE DATOS

server.post("/productos", async(req, res) => {
    console.log(req.body);
    try {
        let newProduct = await sequelize.query(`INSERT INTO productos (nombre, descripcion, precio, disponible, url) VALUES ('${req.body.nombre}', '${req.body.descripcion}', '${req.body.precio}', '${req.body.disponible}', '${req.body.url}');`, { type: sequelize.QueryTypes.INSERT });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Producto creado con exito`,
            body: newProduct
        }
        res.json(respuesta);
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: error,
        }
        res.json(respuesta);
    }
});

//ELIMINA PRODUCTOS YA CREADOS DE LA BASE DE DATOS EN FUNCION DEL ID DEL PRODUCTO QUE VA COMO QUERY EN LA URL

server.delete("/productos", async(req, res) => {
    console.log(req.query);
    let idBorrado = req.query.id_productos;
    try {
        let borrarProducto = await sequelize.query(`DELETE FROM productos WHERE id_productos='${idBorrado}';`, { type: sequelize.QueryTypes.DELETE });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Producto eliminado`,
            body: borrarProducto
        }
        res.json(respuesta)
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: error,
        }
        res.json(respuesta);
    }
})

// ACTUALIZA UN PRODUCTO

server.put("/productos", async(req, res) => {
    let idModificado = req.query.id;
    let newOrder = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        disponible: req.body.disponible,
        url: req.body.url
    }
    try {
        let borrarProducto = await sequelize.query(`UPDATE productos SET status= '${newOrder.nombre}',  descripcion= '${newOrder.descripcion}', precio='${newOrder.precio}', disponible='${newOrder.disponible}', url='${newOrder.url}'  WHERE id='${idModificado}';`, { type: sequelize.QueryTypes.UPDATE });
        let newProduct = await sequelize.query(`SELECT * FROM productos WHERE id='${idModificado}';`, { type: sequelize.QueryTypes.SELECT });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Producto actualizado correctamente`,
            body: newProduct
        }
        res.json(respuesta)
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: error,
        }
        res.json(respuesta);
    }
})

// CREA UN PEDIDO

server.post("/pedidos", async(req, res) => {

    try {
        let aux = await sequelize.query(`INSERT INTO pedidos (id_usuario, time, status, detalle, importe, formaPago, direccion) VALUES ('${req.body.id_usuario}', '${req.body.time}', '${req.body.status}', '${req.body.detalle}', '${req.body.importe}', '${req.body.formaPago}', '${req.body.direccion}');`, { type: sequelize.QueryTypes.INSERT });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Pedido creado exitosamente`,
        }
        res.json(respuesta)
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: error,
        }
        res.json(respuesta);
    }
});

server.put("/pedidos", async(req, res) => {
    let idModificado = req.query.id;
    let newOrder = {
        status: req.body.status
    }
    try {
        let actualizaEstado = await sequelize.query(`UPDATE pedidos SET status='${newOrder.status}' WHERE id='${idModificado}';`, { type: sequelize.QueryTypes.UPDATE });
        let pedidoAct = await sequelize.query(`SELECT * FROM pedidos WHERE id='${idModificado}';`, { type: sequelize.QueryTypes.SELECT });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Producto actualizado correctamente`,
            body: pedidoAct
        }
        res.json(respuesta)
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: error,
        }
        res.json(respuesta);
    }
})

server.delete("/pedidos", async(req, res) => {
    console.log(req.query);
    let idBorrado = req.query.id;
    try {
        let borrarPedido = await sequelize.query(`DELETE FROM pedidos WHERE id='${idBorrado}';`, { type: sequelize.QueryTypes.DELETE });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Pedido eliminado`,
            body: borrarPedido
        }
        res.json(respuesta)
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: error,
        }
        res.json(respuesta);
    }
})

// DEVUELVE TODOS LOS PEDIDOS DEL SISTEMA
server.get('/pedidos', async(req, res) => {
    try {
        let pedidosList = await sequelize.query(`SELECT pedidos.status, pedidos.time, pedidos.id_pedido, pedidos.detalle, pedidos.formaPago, pedidos.importe, usuarios.nombre, usuarios.apellidos, pedidos.direccion FROM pedidos INNER JOIN usuarios ON pedidos.id_usuario=usuarios.id_usuario;;`, { type: sequelize.QueryTypes.SELECT });
        let respuesta = {
            response: "Ok",
            status: 200,
            description: `Petición recibida y servida`,
            body: pedidosList
        }
        res.json(respuesta);
    } catch (error) {
        let respuesta = {
            response: "Error",
            status: 404,
            description: `Error del servidor, vuelva a intentarlo mas tarde`,
            body: error
        }
        res.json(respuesta);
    }
});