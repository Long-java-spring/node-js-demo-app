const userController = require("../controllers/user.controller");
const auth = require("../security/authjwt");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users/get-all", 
    [auth.verifyToken, auth.isAdmin], 
    userController.findAll
  );

  app.post("/api/users/get-all-by-page", 
    [auth.verifyToken, auth.isAdmin], 
    userController.getUsersByPage
  );

};