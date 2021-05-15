const jwt = require("jsonwebtoken");
const authConfig = require("../configuration/auth.config");
const userService = require("../services/user.service");

exports.verifyToken = (req, res, next) => {
  let bearerToken = req.headers["authorization"];
  if (!bearerToken) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  
  const token = bearerToken.slice(7); // remove str ="Bearer "
  jwt.verify(token, authConfig.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  userService.findByUserId(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return ;
    });
  });
};