const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
require('dotenv').config()
/**
 * config cors
 */
const corsOptions = {
    // origin: "*"
    origin: "http://localhost:3000"
};
const app = express()

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my express application." });
});

const db = require("./app/models");
// db.sequelize.sync();

// use for migration data to db when first run or restore db
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {initial()});
function initial() {
    Role.create({
        id: 1,
        name: "admin"
    });
    Role.create({
        id: 2,
        name: "user"
    });
}

// route
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});