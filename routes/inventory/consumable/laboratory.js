const express = require("express");
const router = express.Router();
const laboratory = require("../../../controllers/inventory/consumable/Laboratory");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, laboratory.createLaboratory);
router.post("/purchase-item/",verifyToken,laboratory.createLaboratoryPurchaseItem);
router.get("/", verifyToken, laboratory.getAllLaboratory);
router.get("/:id", verifyToken, laboratory.getSingleLaboratory);
router.patch("/:id", verifyToken, laboratory.updateLaboratory);
router.patch("/:id/purchase-item/",verifyToken,laboratory.updateLaboratoryPurchaseItem);
router.delete("/:id", verifyToken, laboratory.deleteLaboratory);

module.exports = router;
