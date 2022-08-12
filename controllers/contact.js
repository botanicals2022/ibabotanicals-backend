const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createContact = async (req, res) => {
  const { telephone, mobile, email, other, userId } = req.body;
  try {
    const result = await prisma.contact.create({
      data: {
        telephone,
        mobile,
        email,
        other,
        userId,
      },
    });
    res.json({ message: "Created new contact", contact: result });
  } catch (err) {
    return res.status(400).send("Unable to create contact");
  }
};

const getAllContact = async (req, res) => {
  try {
    const result = await prisma.contact.findMany();
    res.json({ message: "Retrieved all contact", contacts: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const getSingleContact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.contact.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved contact", contact: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { telephone, mobile, email, other, userId } = req.body;
  try {
    const result = await prisma.contact.update({
      where: { id: Number(id) },
      data: { telephone, mobile, email, other, userId },
    });
    res.json({ message: "Updated contact", contact: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};
// for user with admin privilege
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.contact.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted contact", contact: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createContact,
  getAllContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
