const express = require("express");
const router = express.Router();
const extractedElemi = require("../../controllers/elemi/extractedElemi");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, extractedElemi.createExtractedElemi);
router.get("/", verifyToken, extractedElemi.getAllExtractedElemi);
router.get("/:id", verifyToken, extractedElemi.getSingleExtractedElemi);
router.patch("/:id", verifyToken, extractedElemi.updateExtractedElemi);
router.delete("/:id", verifyToken, extractedElemi.deleteExtractedElemi);

module.exports = router;
