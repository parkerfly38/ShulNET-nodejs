const dbConfig = require("../app/config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.members = require("./member.model")(mongoose);
db.memberFamily = require("./member_family.model")(mongoose);
db.invoice = require("./invoice.model")(mongoose);
db.yz = require("./yahrzeit.model")(mongoose);
db.calendar = require("./calendar.model")(mongoose);
db.event = require("./event.model")(mongoose);

module.exports = db;