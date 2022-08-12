const express = require("express");
const router = express.Router();
const purchaseItem = require("../../controllers/inventory/purchaseItem");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, purchaseItem.createPurchaseItem);
router.get("/", verifyToken, purchaseItem.getAllPurchaseItem);
router.get("/:id", verifyToken, purchaseItem.getSinglePurchaseItem);
router.patch("/:id", verifyToken, purchaseItem.updatePurchaseItem);
router.delete("/:id", verifyToken, purchaseItem.deletePurchaseItem);

module.exports = router;
