const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemi = async (req, res) => {
  const { oil, oilInvId, fuel, fuelInvId, material } = req.body;

  try {
    const result = await prisma.elemi.create({
      data: {
        oil,
        oilInvId,
        fuel,
        fuelInvId,
        material,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new elemi", elemi: result });
  } catch (err) {
    return res.status(400).send("Unable to create elemi");
  }
};

const getAllElemi = async (req, res) => {
  try {
    const result = await prisma.elemi.findMany();
    res.json({ message: "Retrieved all elemi", elemiList: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data elemi");
  }
};

const getSingleElemi = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemi.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved elemi", elemi: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateElemi = async (req, res) => {
  const { id } = req.params;
  const { oil, oilInvId, fuel, fuelInvId, material } = req.body;
  try {
    const result = await prisma.elemi.update({
      where: { id: Number(id) },
      data: {
        oil,
        oilInvId,
        fuel,
        fuelInvId,
        material,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Updated elemi", elemi: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemi = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemi.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted elemi", elemi: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemi,
  getAllElemi,
  getSingleElemi,
  updateElemi,
  deleteElemi,
};
