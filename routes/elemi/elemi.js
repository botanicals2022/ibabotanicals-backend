const express = require("express");
const router = express.Router();
const elemi = require("../../controllers/elemi/elemi");
const { verifyToken } = require("../../middleware/auth");

router.post("/", verifyToken, elemi.createElemi);
router.get("/", verifyToken, elemi.getAllElemi);
router.get("/:id", verifyToken, elemi.getSingleElemi);
router.patch("/:id", verifyToken, elemi.updateElemi);
router.delete("/:id", verifyToken, elemi.deleteElemi);

module.exports = router;
