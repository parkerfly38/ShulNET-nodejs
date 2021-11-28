var express = require("express");
const YahrzeitController = require("../controllers/yahrzeit.controller");
const authorize = require('../middleware/authorize');
const Role = require('../handlers/role');

var router = express.Router();

router.post("/", authorize(), YahrzeitController.create);
router.get("/", authorize(Role.Admin), YahrzeitController.findAll);
router.get("/:id", authorize(), YahrzeitController.findOne);
router.put("/:id", authorize(), YahrzeitController.update);
router.delete("/:id", authorize(Role.Admin), YahrzeitController.delete);

module.exports = router;