const express = require("express");
const router = express.Router();
const elemiMRF = require("../../../controllers/elemi/forms/elemiMRF");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, elemiMRF.createElemiMRF);
router.get("/", verifyToken, elemiMRF.getAllElemiMRF);
router.get("/:id", verifyToken, elemiMRF.getSingleElemiMRF);
router.patch("/:id", verifyToken, elemiMRF.updateElemiMRF);
router.delete("/:id", verifyToken, elemiMRF.deleteElemiMRF);

module.exports = router;
