const express = require("express");
const router = express.Router();
const material = require("../controllers/material");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, material.createMaterial);
router.get("/", verifyToken, material.getAllMaterial);
router.get("/:id", verifyToken, material.getSingleMaterial);
router.patch("/:id", verifyToken, material.updateMaterial);
router.delete("/:id", verifyToken, material.deleteMaterial);

module.exports = router;
