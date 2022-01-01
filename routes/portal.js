var express = require("express");
const PortalController = require("../controllers/portal.controller");
const authorize = require('../middleware/authorize');
const Role = require('../handlers/role');

var router = express.Router();

//members
router.get("/", PortalController.findAll);
router.get("/:id", PortalController.findAll);
router.get("/settings", authorize(Role.Admin), PortalController.findAllWithSettings);
router.get("/settings/:id", authorize(Role.Admin), PortalController.findOneWithSettings);
router.post("/", authorize(Role.Admin), PortalController.create);
router.put("/:id", authorize(Role.Admin), PortalController.update);
router.delete("/:id", authorize(Role.Admin), PortalController.delete);

module.exports = router;