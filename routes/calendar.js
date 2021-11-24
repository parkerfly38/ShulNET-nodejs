var express = require("express");
const CalendarController = require("../controllers/calendar.controller");

var router = express.Router();

router.post("/", CalendarController.create);
router.get("/", CalendarController.findAll);
router.get("/:id", CalendarController.findOne);
router.put("/:id", CalendarController.update);
router.delete("/:id", CalendarController.delete);

module.exports = router;