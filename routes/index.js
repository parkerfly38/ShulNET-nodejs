/**
 * This module connects modules to routes
 */

var router = require("express").Router();
var memberRouter = require("./members");
var invoiceRouter = require("./invoice");
var calendarRouter = require("./calendar");
var yzRouter = require("./yahrzeit");
var eventRouter = require("./event");
var accountRouter = require("./account");

router.use("/members", memberRouter);
router.use("/invoices", invoiceRouter);
router.use("/calendar", calendarRouter);
router.use("/yahrzeit", yzRouter);
router.use("/event", eventRouter);
router.use("/account", accountRouter);

module.exports = router;