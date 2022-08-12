const express = require("express");
const router = express.Router();
const finalOil = require("../../../controllers/elemi/oils/finalOil");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, finalOil.createFinalOil);
router.get("/", verifyToken, finalOil.getAllFinalOil);
router.get("/:id", verifyToken, finalOil.getSingleFinalOil);
router.patch("/:id", verifyToken, finalOil.updateFinalOil);
router.delete("/:id", verifyToken, finalOil.deleteFinalOil);

module.exports = router;
