const db = require("../models");
const Role = db.role;

const Op = db.Sequelize.Op;

exports.findAll = (roles) => {
    Role.findAll({
        where: {
          name: {
            [Op.or]: roles
          }
        }
    })
};

exports.checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};