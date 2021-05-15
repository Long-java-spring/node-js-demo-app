module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
    type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    birthday: {
        type: Sequelize.DATEONLY
    },
    createdAt: {
        type: Sequelize.DATE
    }
    });
  
    return User;
};