const express = require("express");
const router = express.Router();
const office = require("../../../controllers/inventory/consumable/office");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, office.createOffice);
router.post("/purchase-item/", verifyToken, office.createOfficePurchaseItem);
router.get("/", verifyToken, office.getAllOffice);
router.get("/:id", verifyToken, office.getSingleOffice);
router.patch("/:id", verifyToken, office.updateOffice);
router.patch("/:id/purchase-item/",verifyToken,office.updateOfficePurchaseItem);
router.delete("/:id", verifyToken, office.deleteOffice);

module.exports = router;
