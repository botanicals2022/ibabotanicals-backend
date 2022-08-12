const express = require("express");
const router = express.Router();
const elemiTFP = require("../../../controllers/elemi/forms/elemiTFP");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, elemiTFP.createElemiTFP);
router.get("/", verifyToken, elemiTFP.getAllElemiTFP);
router.get("/:id", verifyToken, elemiTFP.getSingleElemiTFP);
router.patch("/:id", verifyToken, elemiTFP.updateElemiTFP);
router.delete("/:id", verifyToken, elemiTFP.deleteElemiTFP);

module.exports = router;
