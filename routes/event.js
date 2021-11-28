var express = require("express");
const EventController = require("../controllers/event.controller");
const authorize = require('../middleware/authorize');
const Role = require('../handlers/role');

var router = express.Router();

router.post("/", authorize(Role.Admin), EventController.create);
router.get("/", EventController.findAll);
router.get("/calendar/:calendar_id", EventController.findByCalendarId);
router.get("/:id", EventController.findOne);
router.put("/:id", authorize(Role.Admin), EventController.update);
router.delete("/:id", authorize(Role.Admin), EventController.delete);

module.exports = router;