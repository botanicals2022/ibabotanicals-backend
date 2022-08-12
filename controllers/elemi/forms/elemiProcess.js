const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemiProcess = async (req, res) => {
  const {
    jsonObject,
    totalTime,
    averageFlowRate,
    totalOilRecovery,
    fuelConsumed,
    totalResinWeight,
    oilBatchNumber,
  } = req.body;

  try {
    const result = await prisma.elemiProcess.create({
      data: {
        jsonObject,
        totalTime,
        averageFlowRate,
        totalOilRecovery,
        fuelConsumed,
        totalResinWeight,
        oilBatchNumber,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new elemi process", elemiProcess: result });
  } catch (err) {
    console.log("elemi process", err);
    return res.status(400).send("Unable to create elemi process");
  }
};

const getAllElemiProcess = async (req, res) => {
  try {
    const result = await prisma.elemiProcess.findMany();
    res.json({
      message: "Retrieved all elemi process",
      elemiProcessList: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data elemi process");
  }
};

const getSingleElemiProcess = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiProcess.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved elemi process", elemiProcess: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateElemiProcess = async (req, res) => {
  const { id } = req.params;
  const {
    jsonObject,
    isConsumed,
    totalTime,
    averageFlowRate,
    totalOilRecovery,
    fuelConsumed,
    totalResinWeight,
    oilBatchNumber,
  } = req.body;
  try {
    const result = await prisma.elemiProcess.update({
      where: { id: Number(id) },
      data: {
        jsonObject,
        isConsumed,
        totalTime,
        averageFlowRate,
        totalOilRecovery,
        fuelConsumed,
        totalResinWeight,
        oilBatchNumber,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Updated elemi process", elemiProcess: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemiProcess = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiProcess.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted elemi process", elemiProcess: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemiProcess,
  getAllElemiProcess,
  getSingleElemiProcess,
  updateElemiProcess,
  deleteElemiProcess,
};
