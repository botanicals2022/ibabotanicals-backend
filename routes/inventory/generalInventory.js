const express = require("express");
const router = express.Router();
const generalInventory = require("../../controllers/inventory/generalInventory");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, generalInventory.createGeneralInventory);
router.get("/", verifyToken, generalInventory.getAllGeneralInventory);
router.get("/:id", verifyToken, generalInventory.getSingleGeneralInventory);
router.patch("/:id", verifyToken, generalInventory.updateGeneralInventory);
router.delete("/:id", verifyToken, generalInventory.deleteGeneralInventory);

module.exports = router;
