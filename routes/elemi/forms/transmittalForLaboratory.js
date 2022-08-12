const express = require("express");
const router = express.Router();
const elemiTFL = require("../../../controllers/elemi/forms/elemiTFL");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, elemiTFL.createElemiTFL);
router.get("/", verifyToken, elemiTFL.getAllElemiTFL);
router.get("/:id", verifyToken, elemiTFL.getSingleElemiTFL);
router.patch("/:id", verifyToken, elemiTFL.updateElemiTFL);
router.delete("/:id", verifyToken, elemiTFL.deleteElemiTFL);

module.exports = router;
