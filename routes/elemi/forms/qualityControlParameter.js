const express = require("express");
const router = express.Router();
const elemiQCP = require("../../../controllers/elemi/forms/elemiQCP");
const { verifyToken } = require("../../../middleware/auth");

router.post("/", verifyToken, elemiQCP.createElemiQCP);
router.get("/", verifyToken, elemiQCP.getAllElemiQCP);
router.get("/:id", verifyToken, elemiQCP.getSingleElemiQCP);
router.patch("/:id", verifyToken, elemiQCP.updateElemiQCP);
router.delete("/:id", verifyToken, elemiQCP.deleteElemiQCP);

module.exports = router;
