var express = require("express");
const EmailerController = require("../controllers/emailer.controller");
const authorize = require("../middleware/authorize");
const Role = require("../handlers/role");

var router = express.Router();

//emailer
router.get("/", authorize(Role.Admin), EmailerController.findAll);
router.get("/:id", authorize(Role.Admin), EmailerController.findOne);
router.post("/", authorize(Role.Admin), EmailerController.create);

module.exports = router;