const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createReceiveOil = async (req, res) => {
  const {
    tblRows,
    tag,
    prodShift,
    totalHSE,
    totalElemiFilipina,
    totalFlowRate,
    totalOilRecovery,
  } = req.body;

  try {
    const result = await prisma.elemiReceiveOil.create({
      data: {
        tblRows,
        tag,
        prodShift,
        totalHSE,
        totalElemiFilipina,
        totalFlowRate,
        totalOilRecovery,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Created new elemi receive oil",
      elemiReceiveOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create elemi receive oil");
  }
};

const getAllReceiveOil = async (req, res) => {
  try {
    const result = await prisma.elemiReceiveOil.findMany();
    res.json({
      message: "Retrieved all elemi receive oil",
      elemiReceiveOilList: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data elemi receive oil");
  }
};

const getSingleReceiveOil = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiReceiveOil.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved elemi receive oil",
      elemiReceiveOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateReceiveOil = async (req, res) => {
  const { id } = req.params;
  const {
    tblRows,
    tag,
    prodShift,
    totalHSE,
    totalElemiFilipina,
    totalFlowRate,
    totalOilRecovery,
  } = req.body;
  try {
    const result = await prisma.elemiReceiveOil.update({
      where: { id: Number(id) },
      data: {
        tblRows,
        tag,
        prodShift,
        totalHSE,
        totalElemiFilipina,
        totalFlowRate,
        totalOilRecovery,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Updated elemi receive oil",
      elemiReceiveOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteReceiveOil = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiReceiveOil.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted elemi receive oil",
      elemiReceiveOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createReceiveOil,
  getAllReceiveOil,
  getSingleReceiveOil,
  updateReceiveOil,
  deleteReceiveOil,
};
