const express = require("express");
const router = express.Router();
const ticket = require("../controllers/ticket");
const { verifyToken } = require("../middleware/auth");

router.post("/", verifyToken, ticket.createTicket);
router.get("/", verifyToken, ticket.getAllTicket);
router.get("/:id", verifyToken, ticket.getSingleTicket);
router.patch("/:id", verifyToken, ticket.updateTicket);
router.delete("/:id", verifyToken, ticket.deleteTicket);

module.exports = router;
