const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemiLaboratory = async (req, res) => {
  const { product, productCode, quantity } = req.body;

  try {
    const result = await prisma.elemiLaboratory.create({
      data: {
        product,
        productCode,
        quantity,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new laboratory", laboratory: result });
  } catch (err) {
    return res.status(400).send("Unable to create laboratory");
  }
};

const getAllElemiLaboratory = async (req, res) => {
  try {
    const result = await prisma.elemiLaboratory.findMany();
    res.json({ message: "Retrieved all laboratory", laboratories: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data laboratory");
  }
};

const getSingleElemiLaboratory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiLaboratory.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved laboratory", laboratory: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateElemiLaboratory = async (req, res) => {
  const { id } = req.params;
  const { product, productCode, quantity } = req.body;
  try {
    const result = await prisma.elemiLaboratory.update({
      where: { id: Number(id) },
      data: { product, productCode, quantity, userId: req.user.userId },
    });
    res.json({ message: "Updated laboratory", laboratory: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemiLaboratory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiLaboratory.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted laboratory", laboratory: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemiLaboratory,
  getAllElemiLaboratory,
  getSingleElemiLaboratory,
  updateElemiLaboratory,
  deleteElemiLaboratory,
};
