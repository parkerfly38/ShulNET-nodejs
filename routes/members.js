/**
 * This module is the CRUD for members
 */
const { authJwt } = require("../middleware");

var express = require("express");
const MemberController = require("../controllers/member.controller");
const MemberFamilyController = require("../controllers/member_family.controller");

var router = express.Router();

//members
router.get("/", [authJwt.verifyToken], MemberController.findAll);
router.get("/:id", MemberController.findOne);
router.post("/", MemberController.create);
router.put("/:id", MemberController.update);
router.delete("/:id", MemberController.delete);

//family members
router.get("/:member_id/family", MemberFamilyController.findAll);
router.get("/family/:id", MemberFamilyController.findOne);
router.post("/family", MemberFamilyController.create);
router.put("/family/:id", MemberFamilyController.update);
router.delete("/family/:id", MemberFamilyController.delete);

//invoices
router.get("/:member_id/invoices", MemberController.getMemberInvoices);

module.exports = router;