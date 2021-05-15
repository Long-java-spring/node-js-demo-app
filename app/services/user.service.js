const db = require("../models");
const User = db.user;
const bcryptUtil = require("../utils/bcrypt.util");
const Op = db.Sequelize.Op;

exports.create = (userObject) => {
    return User.create({
      username: userObject.username,
      email: userObject.email,
      password: bcryptUtil.bcryptPassword(userObject.password, 8), 
      first_name: userObject.firstName,
      last_name: userObject.lastName, 
      birthday: userObject.birthday
    });
}

exports.findAll = () => {
  return User.findAll();
}

exports.findAndCountAll = (requestValue, limit, offset) => {
  const birthdayFromDate = requestValue.birthdayFromDate.trim() === "" 
      ? new Date(1,1,1) 
      : new Date(requestValue.birthdayFromDate.trim());
  const birthdayToDate = requestValue.birthdayToDate.trim() === "" 
      ? new Date() 
      : new Date(requestValue.birthdayToDate.trim());

  const createdFromDate = requestValue.createdFromDate.trim() === "" 
      ? new Date(1,1,1) 
      : new Date(requestValue.createdFromDate.trim());
  const createdToDate = requestValue.createdToDate.trim() === "" 
      ? new Date() 
      : new Date(requestValue.createdToDate.trim());

  return User.findAndCountAll({ where: {
    username: requestValue.username.trim() === '' ? {
      [Op.ne]: '`!@#$%^&*'
    } : {[Op.like]: `%${requestValue.username.trim()}%`},
    [Op.or]: [
      {
        first_name: requestValue.name.trim() === '' ? {
          [Op.ne]: '`!@#$%^&*'
        } : {[Op.like]: `%${requestValue.name.trim()}%`}
      }, 
      {
        last_name: requestValue.name.trim() === '' ? {
          [Op.ne]: '`!@#$%^&*'
        } : {[Op.like]: `%${requestValue.name.trim()}%`}
      }
    ], 
    birthday: { [Op.and]: [{ [Op.gte]: birthdayFromDate }, { [Op.lte]: birthdayToDate }] },
    createdAt: { [Op.and]: [{ [Op.gte]: createdFromDate }, { [Op.lte]: createdToDate }] },
   }, 
   order: [
    ['id', 'DESC']
  ], 
   limit, offset });
}

exports.findByUserId = (userId) => {
  return User.findByPk(userId)
}

exports.findOneByUserName = (userName) => {
  return User.findOne({
      where: {
        username: userName
      }
  });
}

exports.findOneByEmail = (email) => {
  return User.findOne({
      where: {
        email: email
      }
  });
}

exports.changePasssword = (userId, newPassword) => {
  return User.update({ password: bcryptUtil.bcryptPassword(newPassword, 8) }, { where: { id: userId }});
}

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }

      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
  
        next();
      });
    });
  };