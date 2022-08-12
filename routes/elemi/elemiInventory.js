const express = require("express");
const router = express.Router();
const elemiInventory = require("../../controllers/elemi/elemiInventory");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, elemiInventory.createElemiInventory);
router.get("/", verifyToken, elemiInventory.getAllElemiInventory);
router.get("/:id", verifyToken, elemiInventory.getSingleElemiInventory);
router.patch("/:id", verifyToken, elemiInventory.updateElemiInventory);
router.delete("/:id", verifyToken, elemiInventory.deleteElemiInventory);

module.exports = router;
