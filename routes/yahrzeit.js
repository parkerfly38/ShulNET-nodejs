var express = require("express");
const YahrzeitController = require("../controllers/yahrzeit.controller");

var router = express.Router();

router.post("/", YahrzeitController.create);
router.get("/", YahrzeitController.findAll);
router.get("/:id", YahrzeitController.findOne);
router.put("/:id", YahrzeitController.update);
router.delete("/:id", YahrzeitController.delete);

module.exports = router;