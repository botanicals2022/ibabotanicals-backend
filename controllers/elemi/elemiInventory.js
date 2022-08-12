const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemiInventory = async (req, res) => {
  const { grade, percentage, quantity, source = [] } = req.body;

  let tmpData = undefined;
  if (source.length > 0) tmpData = { source };
  // console.log("tmpData", { grade, percentage, quantity, ...tmpData });

  try {
    const result = await prisma.elemiInventory.create({
      data: {
        grade,
        percentage,
        quantity,
        userId: req.user.userId,
        ...tmpData,
      },
    });
    res.json({ message: "Created new inventory", inventory: result });
  } catch (err) {
    return res.status(400).send("Unable to create inventory");
  }
};

const getAllElemiInventory = async (req, res) => {
  try {
    const result = await prisma.elemiInventory.findMany();
    res.json({ message: "Retrieved all inventory", inventories: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data inventory");
  }
};

const getSingleElemiInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiInventory.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved inventory", inventory: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateElemiInventory = async (req, res) => {
  const { grade, percentage, quantity, source = [] } = req.body;
  const { id } = req.params;

  let tmpData = undefined;
  if (source.length > 0) tmpData = { source };
  // console.log("tmpData", percentage, ...tmpData);

  try {
    const result = await prisma.elemiInventory.update({
      where: { id: Number(id) },
      data: {
        grade,
        percentage,
        quantity,
        userId: req.user.userId,
        ...tmpData,
      },
    });
    res.json({ message: "Updated inventory", inventory: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemiInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiInventory.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted inventory", inventory: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemiInventory,
  getAllElemiInventory,
  getSingleElemiInventory,
  updateElemiInventory,
  deleteElemiInventory,
};
