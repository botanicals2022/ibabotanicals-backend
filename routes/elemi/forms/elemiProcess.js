const express = require("express");
const router = express.Router();
const elemiProcess = require("../../../controllers/elemi/forms/elemiProcess");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, elemiProcess.createElemiProcess);
router.get("/", verifyToken, elemiProcess.getAllElemiProcess);
router.get("/:id", verifyToken, elemiProcess.getSingleElemiProcess);
router.patch("/:id", verifyToken, elemiProcess.updateElemiProcess);
router.delete("/:id", verifyToken, elemiProcess.deleteElemiProcess);

module.exports = router;
