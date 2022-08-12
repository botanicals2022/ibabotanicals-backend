const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTicket = async (req, res) => {
  const { ticketId, subject, content } = req.body;
  try {
    const result = await prisma.ticket.create({
      data: {
        ticketId,
        subject,
        content,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new ticket", ticket: result });
  } catch (err) {
    return res.status(400).send("Unable to create ticket");
  }
};

const getAllTicket = async (req, res) => {
  try {
    const result = await prisma.ticket.findMany();
    res.json({ message: "Retrieved all ticket", ticketList: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const getSingleTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.ticket.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved ticket", ticket: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { ticketId, subject, content } = req.body;
  try {
    const result = await prisma.ticket.update({
      where: { id: Number(id) },
      data: { ticketId, subject, content, userId: req.user.userId },
    });
    res.json({ message: "Updated ticket", ticket: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};
// for user with admin privilege
const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.ticket.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted ticket", ticket: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createTicket,
  getAllTicket,
  getSingleTicket,
  updateTicket,
  deleteTicket,
};
