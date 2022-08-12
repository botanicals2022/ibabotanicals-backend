const express = require("express");
const router = express.Router();
const rawMaterial = require("../../controllers/inventory/rawMaterial");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, rawMaterial.createRawMaterial);
router.post(
  "/purchase-item/",
  verifyToken,
  rawMaterial.createRawMaterialPurchaseItem
);
router.get("/", verifyToken, rawMaterial.getAllRawMaterial);
router.get("/:id", verifyToken, rawMaterial.getSingleRawMaterial);
router.patch("/:id", verifyToken, rawMaterial.updateRawMaterial);
router.patch(
  "/:id/purchase-item/",
  verifyToken,
  rawMaterial.updateRawMaterialPurchaseItem
);
router.delete("/:id", verifyToken, rawMaterial.deleteRawMaterial);

module.exports = router;
