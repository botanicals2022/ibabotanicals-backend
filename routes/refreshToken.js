const express = require("express");
const router = express.Router();
const authToken = require("../controllers/authToken");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, authToken.refreshToken);

module.exports = router;
