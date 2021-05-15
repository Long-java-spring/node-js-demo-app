const userService = require("../services/user.service");
const roleService = require("../services/role.service");
const bcryptUtil = require("../utils/bcrypt.util");
const jwtUtil = require("../utils/jwt.util");
const dateUtil = require("../utils/date.util");

exports.signup = (req, res) => {
  userService.create(req.body)
    .then(user => {
      if (req.body.roles) {
        roleService.findAll(req.body.roles)
          .then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  userService.findOneByUserName(req.body.username)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcryptUtil.compareSyncPassword(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwtUtil.createToken(user.id);

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          fullName: user.first_name + ' ' + user.last_name,
          username: user.username,
          email: user.email,
          birthday: dateUtil.convertDateTimeToString(user.birthday),
          roles: authorities,
          createdDate: dateUtil.convertDateTimeToString(user.createdAt),
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.changePasssword = (req, res) => {
  userService.findByUserId(req.userId)
    .then(user => {
      if (!user.id) {
        return res.status(403).send({
          accessToken: null,
          message: "500 ERROR SERVER"
        });
      }

      var passwordIsValid = bcryptUtil.compareSyncPassword(
        req.body.currentPassword,
        user.password
      );
    
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      userService.changePasssword(req.userId, req.body.newPassword)
        .then(() => {
          res.status(200).send({ message: "Change password successfully!" });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
  })
  
};