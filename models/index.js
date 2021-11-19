const dbConfig = require("../app/config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.members = require("./MemberModel")(mongoose);

module.exports = db;