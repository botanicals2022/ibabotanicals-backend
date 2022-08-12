const express = require("express");
const router = express.Router();
const elemiLaboratory = require("../../controllers/elemi/elemiLaboratory");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, elemiLaboratory.createElemiLaboratory);
router.get("/", verifyToken, elemiLaboratory.getAllElemiLaboratory);
router.get("/:id", verifyToken, elemiLaboratory.getSingleElemiLaboratory);
router.patch("/:id", verifyToken, elemiLaboratory.updateElemiLaboratory);
router.delete("/:id", verifyToken, elemiLaboratory.deleteElemiLaboratory);

module.exports = router;
