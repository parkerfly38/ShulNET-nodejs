var express = require("express");
const PortalController = require("../controllers/portal.controller");
const authorize = require('../middleware/authorize');
const Role = require('../handlers/role');

var router = express.Router();

//portal
router.get("/", PortalController.findAll);
router.get("/:id", PortalController.findAll);
router.get("/domain/:domain", PortalController.findByDomain);
router.get("/settings", authorize(Role.Admin), PortalController.findAllWithSettings);
router.get("/settings/:id", authorize(Role.Admin), PortalController.findOneWithSettings);
router.post("/", PortalController.create);
router.put("/:id", authorize(Role.Admin), PortalController.update);
router.delete("/:id", authorize(Role.Admin), PortalController.delete);
router.post("/portal-signup", PortalController.signup);

module.exports = router;