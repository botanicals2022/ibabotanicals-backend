const express = require("express");
const router = express.Router();
const fuel = require("../../controllers/inventory/fuel");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, fuel.createFuel);
router.post("/purchase-item/", verifyToken, fuel.createFuelPurchaseItem);
router.get("/", verifyToken, fuel.getAllFuel);
router.get("/:id", verifyToken, fuel.getSingleFuel);
router.patch("/:id", verifyToken, fuel.updateFuel);
router.patch("/:id/purchase-item/", verifyToken, fuel.updateFuelPurchaseItem);
router.delete("/:id", verifyToken, fuel.deleteFuel);

module.exports = router;
