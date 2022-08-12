const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemiTFL = async (req, res) => {
  const {
    tblRows,
    totalHydrosol,
    totalPurifiedOil,
    dateReceived,
    preparedBy,
    receivedBy,
  } = req.body;

  try {
    const result = await prisma.transmittalForLaboratory.create({
      data: {
        tblRows,
        totalHydrosol,
        totalPurifiedOil,
        dateReceived,
        preparedBy,
        receivedBy,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Created new elemi transmittal for laboratory",
      transmittalForLaboratory: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to create elemi transmittal for laboratory");
  }
};

const getAllElemiTFL = async (req, res) => {
  try {
    const result = await prisma.transmittalForLaboratory.findMany();
    res.json({
      message: "Retrieved all elemi transmittal for laboratory",
      transmittalForLaboratoryList: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to retrieve data elemi transmittal for laboratory");
  }
};

const getSingleElemiTFL = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.transmittalForLaboratory.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved elemi transmittal for laboratory",
      transmittalForLaboratory: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateElemiTFL = async (req, res) => {
  const { id } = req.params;
  const {
    tblRows,
    totalHydrosol,
    totalPurifiedOil,
    dateReceived,
    preparedBy,
    receivedBy,
  } = req.body;
  try {
    const result = await prisma.transmittalForLaboratory.update({
      where: { id: Number(id) },
      data: {
        tblRows,
        totalHydrosol,
        totalPurifiedOil,
        dateReceived,
        preparedBy,
        receivedBy,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Updated elemi transmittal for laboratory",
      transmittalForLaboratory: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemiTFL = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.transmittalForLaboratory.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted elemi transmittal for laboratory",
      transmittalForLaboratory: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemiTFL,
  getAllElemiTFL,
  getSingleElemiTFL,
  updateElemiTFL,
  deleteElemiTFL,
};
