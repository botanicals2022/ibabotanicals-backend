const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProcessOil = async (req, res) => {
  const {
    batchNumber,
    distillationDate,
    prodShift,
    hSE,
    hSELoss,
    elemiFilipina,
    elemiFilipinaLoss,
    totalLoss,
    recoveredOil,
  } = req.body;

  try {
    const result = await prisma.elemiProcessedOil.create({
      data: {
        batchNumber,
        distillationDate,
        prodShift,
        hSE,
        hSELoss,
        elemiFilipina,
        elemiFilipinaLoss,
        totalLoss,
        recoveredOil,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Created new elemi process oil",
      elemiProcessedOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create elemi process oil");
  }
};

const getAllProcessOil = async (req, res) => {
  try {
    const result = await prisma.elemiProcessedOil.findMany();
    res.json({
      message: "Retrieved all elemi process oil",
      elemiProcessedOilList: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data elemi process oil");
  }
};

const getSingleProcessOil = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiProcessedOil.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved elemi process oil",
      elemiProcessedOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateProcessOil = async (req, res) => {
  const { id } = req.params;
  const {
    batchNumber,
    distillationDate,
    prodShift,
    hSE,
    hSELoss,
    elemiFilipina,
    elemiFilipinaLoss,
    totalLoss,
    recoveredOil,
  } = req.body;
  try {
    const result = await prisma.elemiProcessedOil.update({
      where: { id: Number(id) },
      data: {
        batchNumber,
        distillationDate,
        prodShift,
        hSE,
        hSELoss,
        elemiFilipina,
        elemiFilipinaLoss,
        totalLoss,
        recoveredOil,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Updated elemi process oil",
      elemiProcessedOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteProcessOil = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiProcessedOil.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted elemi process oil",
      elemiProcessedOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createProcessOil,
  getAllProcessOil,
  getSingleProcessOil,
  updateProcessOil,
  deleteProcessOil,
};
