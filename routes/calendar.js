var express = require("express");
const CalendarController = require("../controllers/calendar.controller");
const authorize = require('../middleware/authorize');
const Role = require('../handlers/role');

var router = express.Router();

router.post("/", authorize(), CalendarController.create);
router.get("/", CalendarController.findAll);
router.get("/:id", CalendarController.findOne);
router.put("/:id", authorize(Role.Admin), CalendarController.update);
router.delete("/:id", authorize(Role.Admin), CalendarController.delete);

module.exports = router;