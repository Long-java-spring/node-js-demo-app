const userService = require("../services/user.service");
const dateUtil = require("../utils/date.util");
const pageUtil = require("../utils/pagination.util");

exports.findAll = (req, res) => {
    const data = [];
    userService.findAll().then(users => {
        users.forEach(element => 
            data.push({
                username: element.username,
                fullName: element.first_name + " " + element.last_name,
                email: element.email,
                birthday: dateUtil.convertDateTimeToString(element.birthday),
                createdDate: dateUtil.convertDateTimeToString(element.createdAt)
            })
        );
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send(null);
    });
};

exports.getUsersByPage = (req, res) => {
    const { page, size } = {page: req.body.page, size: req.body.size};
    const { limit, offset } = pageUtil.getPagination(page, size);
    userService.findAndCountAll(req.body, limit, offset)
        .then(users => {
            const data = users.rows.map(row => {
                const object = {};
                object.id = row.id;
                object.username = row.username;
                object.fullName = row.first_name + " " + row.last_name;
                object.email = row.email;
                object.birthday = dateUtil.convertDateTimeToString(row.birthday);
                object.createdDate = dateUtil.convertDateTimeToString(row.createdAt);
                return object;
            });
            const response = pageUtil.getPagingData({count: users.count, rows: data }, page, limit);
            res.status(200).send(response);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
            });
        });
};