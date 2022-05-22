var express = require("express");
const InvoiceController = require("../controllers/invoice.controller");
const authorize = require('../middleware/authorize');
const Role = require('../handlers/role');

var router = express.Router();

router.post("/", authorize(), InvoiceController.create);
router.get("/", InvoiceController.findAll);
router.get("/member/:member_id", authorize(), InvoiceController.findByMemberId);
router.get("/portal/:portal_id", authorize(Role.Admin), InvoiceController.findByPortalId);
router.get("/:id", authorize(), InvoiceController.fineOne);
router.put("/:id", authorize(), InvoiceController.update);
router.delete("/:id", authorize(Role.Admin), InvoiceController.delete);

module.exports = router;