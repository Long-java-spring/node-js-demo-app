const authController = require("../controllers/auth.controller");
const userService = require("../services/user.service");
const roleService = require("../services/role.service");
const auth = require("../security/authjwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      userService.checkDuplicateUsernameOrEmail,
      roleService.checkRolesExisted
    ],
    authController.signup
  );

  app.post("/api/auth/signin", authController.signin);

  app.put(
    "/api/auth/change-password",
    [auth.verifyToken],
    authController.changePasssword
  );
};