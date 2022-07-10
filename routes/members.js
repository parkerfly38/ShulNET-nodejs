/**
 * This module is the CRUD for members
 */
var express = require("express");
const MemberController = require("../controllers/member.controller");
const MemberFamilyController = require("../controllers/member_family.controller");
const authorize = require('../middleware/authorize');
const Role = require('../handlers/role');

var router = express.Router();

//members
router.get("/", authorize(Role.Admin), MemberController.findAll);
router.get("/:id", authorize(), MemberController.findOne);
router.post("/", authorize(Role.Admin), MemberController.create);
router.put("/:id", authorize(), MemberController.update);
router.delete("/:id", authorize(Role.Admin), MemberController.delete);
router.post("/byemail",authorize(), MemberController.getMemberByEmail);

//family members
router.get("/:member_id/family",authorize(), MemberFamilyController.findAll);
router.get("/family/:id", authorize(), MemberFamilyController.findOne);
router.post("/family", authorize(), MemberFamilyController.create);
router.put("/family/:id", authorize(), MemberFamilyController.update);
router.delete("/family/:id", authorize(), MemberFamilyController.delete);

//invoices
router.get("/:member_id/invoices", authorize(), MemberController.getMemberInvoices);

//yahrzeits
router.get("/:member_id/yahrzeits", authorize(), MemberController.getMemberYahrzeits);

module.exports = router;