const express = require("express");
const router = express.Router();
const maintenance = require("../../../controllers/inventory/consumable/Maintenance");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, maintenance.createMaintenance);
router.post("/purchase-item/",verifyToken,maintenance.createMaintenancePurchaseItem);
router.get("/", verifyToken, maintenance.getAllMaintenance);
router.get("/:id", verifyToken, maintenance.getSingleMaintenance);
router.patch("/:id", verifyToken, maintenance.updateMaintenance);
router.patch("/:id/purchase-item/",verifyToken,maintenance.updateMaintenancePurchaseItem);
router.delete("/:id", verifyToken, maintenance.deleteMaintenance);

module.exports = router;
