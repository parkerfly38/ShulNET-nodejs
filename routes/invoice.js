var express = require("express");
const InvoiceController = require("../controllers/invoice.controller");

var router = express.Router();

router.post("/", InvoiceController.create);
router.get("/", InvoiceController.findAll);
router.get("/:id", InvoiceController.fineOne);
router.put("/:id", InvoiceController.update);
router.delete("/:id", InvoiceController.delete);

module.exports = router;