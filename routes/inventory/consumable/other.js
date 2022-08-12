const express = require("express");
const router = express.Router();
const other = require("../../../controllers/inventory/consumable/other");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, other.createOther);
router.post("/purchase-item/", verifyToken, other.createOtherPurchaseItem);
router.get("/", verifyToken, other.getAllOther);
router.get("/:id", verifyToken, other.getSingleOther);
router.patch("/:id", verifyToken, other.updateOther);
router.patch("/:id/purchase-item/", verifyToken, other.updateOtherPurchaseItem);
router.delete("/:id", verifyToken, other.deleteOther);

module.exports = router;
