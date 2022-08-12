const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createFinalOil = async (req, res) => {
  const {
    blendingDate,
    lotNumber,
    hSE,
    elemiFilipina,
    remarks,
  } = req.body;

  try {
    const result = await prisma.elemiFinalOil.create({
      data: {
        blendingDate,
        lotNumber,
        hSE,
        elemiFilipina,
        remarks,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Created new elemi final oil",
      elemiFinalOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create elemi final oil");
  }
};

const getAllFinalOil = async (req, res) => {
  try {
    const result = await prisma.elemiFinalOil.findMany();
    res.json({
      message: "Retrieved all elemi final oil",
      elemiFinalOilList: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data elemi final oil");
  }
};

const getSingleFinalOil = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiFinalOil.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved elemi final oil",
      elemiFinalOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateFinalOil = async (req, res) => {
  const { id } = req.params;
  const {
    blendingDate,
    lotNumber,
    hSE,
    elemiFilipina,
    remarks,
  } = req.body;
  try {
    const result = await prisma.elemiFinalOil.update({
      where: { id: Number(id) },
      data: {
        blendingDate,
        lotNumber,
        hSE,
        elemiFilipina,
        remarks,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Updated elemi final oil",
      elemiFinalOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteFinalOil = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.elemiFinalOil.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted elemi final oil",
      elemiFinalOil: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createFinalOil,
  getAllFinalOil,
  getSingleFinalOil,
  updateFinalOil,
  deleteFinalOil,
};
