const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, user.createUser);
router.get("/", verifyToken, user.getAllUser);
router.get("/:id", verifyToken, user.getSingleUser);
router.patch("/:id", verifyToken, user.updateUser);
router.delete("/:id", verifyToken, user.deleteUser);

module.exports = router;
