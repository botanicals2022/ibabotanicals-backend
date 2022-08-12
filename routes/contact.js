const express = require("express");
const router = express.Router();
const contact = require("../controllers/contact");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, contact.createContact);
router.get("/", verifyToken, contact.getAllContact);
router.get("/:id", verifyToken, contact.getSingleContact);
router.patch("/:id", verifyToken, contact.updateContact);
router.delete("/:id", verifyToken, contact.deleteContact);

module.exports = router;
