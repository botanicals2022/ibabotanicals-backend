const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemiFuel = async (req, res) => {
  const { efid, name, quantity, batchCode } = req.body;

  const tmpefid = efid ? efid.toUpperCase() : "";

  try {
    const result = await prisma.elemiFuel.create({
      data: {
        efid: tmpefid,
        name,
        quantity,
        batchCode,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new elemi fuel", elemiFuel: result });
  } catch (err) {
    return res.status(400).send("Unable to create elemi fuel");
  }
};

const getAllElemiFuel = async (req, res) => {
  try {
    const result = await prisma.elemiFuel.findMany();
    res.json({ message: "Retrieved all elemi fuel", elemiFuelList: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data elemi fuel");
  }
};

const getSingleElemiFuel = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiFuel.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved elemi fuel", elemiFuel: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve elemi data");
  }
};

const updateElemiFuel = async (req, res) => {
  const { id } = req.params;
  const { efid, name, quantity, batchCode } = req.body;

  const tmpefid = efid ? efid.toUpperCase() : "";

  try {
    const result = await prisma.elemiFuel.update({
      where: { id: Number(id) },
      data: {
        efid: tmpefid,
        name,
        quantity,
        batchCode,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Updated elemi fuel", elemiFuel: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemiFuel = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiFuel.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted elemi fuel", elemiFuel: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemiFuel,
  getAllElemiFuel,
  getSingleElemiFuel,
  updateElemiFuel,
  deleteElemiFuel,
};
