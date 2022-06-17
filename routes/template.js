var express = require("express");
const TemplateController = require("../controllers/template.controller");
const authorize = require("../middleware/authorize");
const Role = require("../handlers/role");

var router = express.Router();

//templates
router.get("/", authorize(Role.Admin), TemplateController.findAll);
router.get("/:id", authorize(Role.Admin), TemplateController.findOne);
router.post("/", authorize(Role.Admin), TemplateController.create);
router.put("/:id", authorize(Role.Admin), TemplateController.update);
router.delete("/:id", authorize(Role.Admin), TemplateController.delete);

module.exports = router;