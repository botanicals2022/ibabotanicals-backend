const express = require("express");
const router = express.Router();
const elemiFuel = require("../../controllers/inventory/elemiFuel");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, elemiFuel.createElemiFuel);
router.get("/", verifyToken, elemiFuel.getAllElemiFuel);
router.get("/:id", verifyToken, elemiFuel.getSingleElemiFuel);
router.patch("/:id", verifyToken, elemiFuel.updateElemiFuel);
router.delete("/:id", verifyToken, elemiFuel.deleteElemiFuel);

module.exports = router;
