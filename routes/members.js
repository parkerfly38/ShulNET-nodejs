/**
 * This module is the CRUD for members
 */

var express = require("express");
const MemberController = require("../controllers/MemberController");

var router = express.Router();

router.get("/", MemberController.findAll);
router.get("/:id", MemberController.findOne);
router.post("/", MemberController.create);
router.put("/:id", MemberController.update);
router.delete("/:id", MemberController.delete);

module.exports = router;