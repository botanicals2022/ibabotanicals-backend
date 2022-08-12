const express = require("express");
const router = express.Router();
const receiveOil = require("../../../controllers/elemi/oils/receiveOil");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, receiveOil.createReceiveOil);
router.get("/", verifyToken, receiveOil.getAllReceiveOil);
router.get("/:id", verifyToken, receiveOil.getSingleReceiveOil);
router.patch("/:id", verifyToken, receiveOil.updateReceiveOil);
router.delete("/:id", verifyToken, receiveOil.deleteReceiveOil);

module.exports = router;
