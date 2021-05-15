### Install
# restart server whenever change code
npm install --save-dev nodemon
# create server
npm install express --save
# add configuration for connect to database
npm install dotenv --save
# add RDBMS for app
npm install mysql --save

### run app
npm run start

### enable ER_NOT_SUPPORTED_AUTH_MODE
ALTER <TABLE_NAME> '<username>'@'<ip>' IDENTIFIED WITH mysql_native_password BY '<password>'

### configuration

configure MySQL database & Sequelize
configure Auth Key
### routes

auth.routes.js: POST signup & signin
user.routes.js: GET public & protected resources
### security

verifySignUp.js: check duplicate Username or Email
authJwt.js: verify Token, check User roles in database
### controllers

auth.controller.js: handle signup & signin actions
user.controller.js: return public & protected content
### models for Sequelize Models

user.model.js
role.model.js
### server.js: import and initialize neccesary modules and routes, listen for connections.

### Short install config
npm install express sequelize mysql2 body-parser cors jsonwebtoken bcryptjs --save

### Document for auth jwt token with mysql
[https://bezkoder.com/node-js-jwt-authentication-mysql/]