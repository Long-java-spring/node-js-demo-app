const bcrypt = require("bcryptjs");

exports.bcryptPassword = (password, salt) => {
    return bcrypt.hashSync(password, salt);
}

exports.compareSyncPassword = (requestPassword, userPassword) => {
    return bcrypt.compareSync(requestPassword, userPassword);
}