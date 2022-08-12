const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemiTFP = async (req, res) => {
  const {
    tblRows,
    totalContainer,
    totalQuantity,
    dateReceived,
    preparedBy,
    receivedBy,
  } = req.body;

  try {
    const result = await prisma.transmittalForProduction.create({
      data: {
        tblRows,
        totalContainer,
        totalQuantity,
        dateReceived,
        preparedBy,
        receivedBy,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Created new elemi transmittal for production",
      transmittalForProduction: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to create elemi transmittal for production");
  }
};

const getAllElemiTFP = async (req, res) => {
  try {
    const result = await prisma.transmittalForProduction.findMany();
    res.json({
      message: "Retrieved all elemi transmittal for production",
      transmittalForProductionList: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to retrieve data elemi transmittal for production");
  }
};

const getSingleElemiTFP = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.transmittalForProduction.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved elemi transmittal for production",
      transmittalForProduction: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateElemiTFP = async (req, res) => {
  const { id } = req.params;
  const {
    tblRows,
    totalContainer,
    totalQuantity,
    dateReceived,
    preparedBy,
    receivedBy,
  } = req.body;
  try {
    const result = await prisma.transmittalForProduction.update({
      where: { id: Number(id) },
      data: {
        tblRows,
        totalContainer,
        totalQuantity,
        dateReceived,
        preparedBy,
        receivedBy,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Updated elemi transmittal for production",
      transmittalForProduction: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemiTFP = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.transmittalForProduction.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted elemi transmittal for production",
      transmittalForProduction: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemiTFP,
  getAllElemiTFP,
  getSingleElemiTFP,
  updateElemiTFP,
  deleteElemiTFP,
};
