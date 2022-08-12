const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemiMRF = async (req, res) => {
  const {
    tblRows,
    totalWeight,
    date,
    productionRequest,
    endorsedBy,
    receivedBy,
  } = req.body;

  try {
    const result = await prisma.materialRequestForm.create({
      data: {
        tblRows,
        totalWeight,
        date,
        productionRequest,
        endorsedBy,
        receivedBy,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Created new elemi material request form",
      materialRequestForm: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create elemi material request form");
  }
};

const getAllElemiMRF = async (req, res) => {
  try {
    const result = await prisma.materialRequestForm.findMany();
    res.json({
      message: "Retrieved all elemi material request form",
      materialRequestFormList: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to retrieve data elemi material request form");
  }
};

const getSingleElemiMRF = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.materialRequestForm.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved elemi material request form",
      materialRequestForm: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateElemiMRF = async (req, res) => {
  const { id } = req.params;
  const {
    tblRows,
    totalWeight,
    date,
    productionRequest,
    endorsedBy,
    receivedBy,
  } = req.body;
  try {
    const result = await prisma.materialRequestForm.update({
      where: { id: Number(id) },
      data: {
        tblRows,
        totalWeight,
        date,
        productionRequest,
        endorsedBy,
        receivedBy,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Updated elemi material request form",
      materialRequestForm: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemiMRF = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.materialRequestForm.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted elemi material request form",
      materialRequestForm: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemiMRF,
  getAllElemiMRF,
  getSingleElemiMRF,
  updateElemiMRF,
  deleteElemiMRF,
};
