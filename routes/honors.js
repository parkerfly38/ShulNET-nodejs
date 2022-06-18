var express = require("express");
const HonorsController = require("../controllers/honors.controller");
const authorize = require("../middleware/authorize");
const Role = require("../handlers/role");

var router = express.Router();

router.post("/", authorize(Role.Admin), HonorsController.create);
router.get("/", authorize(Role.Admin), HonorsController.findAll);
router.get("/:id", authorize(), HonorsController.findOne);
router.put("/:id", authorize(Role.Admin), HonorsController.update);
router.delete("/:id", authorize(Role.Admin), HonorsController.delete);

module.exports = router;