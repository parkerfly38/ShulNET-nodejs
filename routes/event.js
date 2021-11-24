var express = require("express");
const EventController = require("../controllers/event.controller");

var router = express.Router();

router.post("/", EventController.create);
router.get("/", EventController.findAll);
router.get("/calendar/:calendar_id", EventController.findByCalendarId);
router.get("/:id", EventController.findOne);
router.put("/:id", EventController.update);
router.delete("/:id", EventController.delete);

module.exports = router;