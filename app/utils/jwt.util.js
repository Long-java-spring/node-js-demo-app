
var jwt = require("jsonwebtoken");
const authConfig = require("../configuration/auth.config");

exports.createToken = (userId) => {
    return jwt.sign({ id: userId }, authConfig.SECRET, 
        { expiresIn: authConfig.EXPIRES_IN_TIME });
}