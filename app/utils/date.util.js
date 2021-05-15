const moment = require("moment");

exports.convertDateTimeToString = (dateTime) => {
    return moment(dateTime).format('DD/MM/YYYY');
}