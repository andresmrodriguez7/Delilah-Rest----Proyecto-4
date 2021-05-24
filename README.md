
# Delilah Resto 

This is an API REST built to manage a food store´s orders. It will allow you to:
- Use CRUD functions on users, orders and products
- Sign in and role validation


## Getting Started 

Para utilizar el proyect se deberá contar al menos con Node.js 13.10.1 y MySQL 8.0.

### Previous Requirements 📄

1. Have a text editor
2. Install and configure a database engine
3. Install Node.js
4. Install Postman

#### Installation ⚙️

1. Clone repository

```sh
git clone https://github.com/andresmrodriguez7/Delilah-Rest-Proyecto-4.git
```

2. Install all dependencies with npm

```sh
npm install body-parser
npm install dotenv
npm install express
npm install express-jwt
npm install mysql2
npm install sequelize
npm install nodemon
```

3. Edit your conection to MySQL in `conexion.js`

```JS
mariadbUser='ENTER_YOUR_CONNECTION_CREDENTIALS'
mariadbPass='ENTER_YOUR_CONNECTION_CREDENTIALS'
```

4. Create your DataBase with the file delilah.sql


5. Execute server

```sh
nodemon run start
```

##### License 📜

This project is under the MIT License - see the file [LICENSE.md]
