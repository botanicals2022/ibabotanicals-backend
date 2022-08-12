const express = require("express");
const router = express.Router();
const register = require("../controllers/register");
// const { verifyToken } = require("../middleware/auth");

router.post("/", register);

module.exports = router;
