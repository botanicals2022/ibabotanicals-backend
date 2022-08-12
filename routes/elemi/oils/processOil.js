const express = require("express");
const router = express.Router();
const processOil = require("../../../controllers/elemi/oils/processOil");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, processOil.createProcessOil);
router.get("/", verifyToken, processOil.getAllProcessOil);
router.get("/:id", verifyToken, processOil.getSingleProcessOil);
router.patch("/:id", verifyToken, processOil.updateProcessOil);
router.delete("/:id", verifyToken, processOil.deleteProcessOil);

module.exports = router;
