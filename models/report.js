var mongoose = require('mongoose');
var schema = mongoose.Schema;
var reportSchema = new schema ({
    "reportId": String,
    "title": String,
    "status": String,
    "category": String,
    "desc": String,
    "datetime": String,
    "writer": String
});
module.exports = mongoose.model('report',reportSchema);