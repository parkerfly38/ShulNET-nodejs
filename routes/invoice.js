var express = require("express");
const InvoiceController = require("../controllers/invoice.controller");
const authorize = require('../middleware/authorize');
const Role = require('../handlers/role');

var router = express.Router();

router.post("/", authorize(), InvoiceController.create);
router.get("/", authorize(Role.Admin), InvoiceController.findAll);
router.get("/member/:member_id", authorize(), InvoiceController.findByMemberId);
router.get("/:id", InvoiceController.fineOne);
router.put("/:id", InvoiceController.update);
router.delete("/:id", InvoiceController.delete);

module.exports = router;