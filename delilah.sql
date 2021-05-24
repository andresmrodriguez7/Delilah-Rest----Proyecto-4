/* ------------------------------------------------------------------------------ */
/*    File:       delilah.sql  ------------------------------------------------- */
/*    Author:     Andres Mesa -------------------------------------------------- */
/*    Purpose:    Create DB ----------------------------------------------------- */
/* ------------------------------------------------------------------------------ */


CREATE DATABASE acamica;
USE acamica;

CREATE TABLE usuarios(
	id_usuario INT NOT NULL AUTO_INCREMENT,
	usuario VARCHAR(50) NOT NULL UNIQUE,
	nombre VARCHAR(250) NOT NULL,
	apellidos VARCHAR(250) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	telefono VARCHAR(50) NOT NULL UNIQUE,
 direccion VARCHAR(50) NOT NULL,
	contraseña VARCHAR(250) NOT NULL DEFAULT 0,
	is_admin TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY(id_usuario)
) AUTO_INCREMENT = 1000;

CREATE TABLE productos(
	id_productos INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(25) NOT NULL,
 descripcion VARCHAR(250) NOT NULL,
 precio INT NOT NULL,
 disponible TINYINT NOT NULL DEFAULT 1, 
 url VARCHAR(500) NOT NULL,
	PRIMARY KEY(id_productos)
);

CREATE TABLE pedidos(
	id_pedido INT NOT NULL AUTO_INCREMENT,
 id_usuario INT NOT NULL,
	time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	status VARCHAR(250) NOT NULL NOT NULL,
	detalle VARCHAR(500) NOT NULL NOT NULL,
 importe INT NOT NULL,
	formaPago VARCHAR(250) NOT NULL NOT NULL,
 direccion 
	PRIMARY KEY(id_pedido),
	FOREIGN KEY(id_usuario) REFERENCES usuarios(id_usuario),
) AUTO_INCREMENT = 10000;

INSERT INTO productos (nombre, descripcion, precio, disponible, url)
VALUES 
('Coffee Late', 'xLateCoff', '16000', '1', 'cafe.jpg');
('Big Mac', 'xBigMag', '23000', '1', 'big-mac.jpg');
('Leslies Burger', 'xLeslies', '13000', '1', 'desayuno.jpg');
('Burger Master', 'xMaster', '21000', '1', 'hamburguesa1.jpg');
('Break Faster', 'xBreak', '15000', '1', 'huevo.png');
('Tostadito Criollo', 'xCriollo', '21000', '1', 'tostado-criollo-bacon.png');
('Tostado', 'xTostTrad', '18000', '1', 'tostado.png');
 
 INSERT INTO usuarios (usuario, nombre, apellidos, email, telefono, direccion, contrasena)
 VALUES 
 ('adminDelilah', 'Administrador', 'root', 'admin.delilah.com', '111111111', 'Delilah Restó', 'admin');
