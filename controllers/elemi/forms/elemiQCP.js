const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createElemiQCP = async (req, res) => {
  const {
    tblRows,
    oHSBR,
    totalROW,
    sAR,
    refNumber,
    rMBNumber,
    outboundDate,
    remarks,
    releasedBy,
    receivedBy,
  } = req.body;

  try {
    const result = await prisma.qualityControlParameter.create({
      data: {
        tblRows,
        oHSBR,
        totalROW,
        sAR,
        refNumber,
        rMBNumber,
        outboundDate,
        remarks,
        releasedBy,
        receivedBy,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Created new elemi quality control parameter",
      qualityControlParameter: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to create elemi quality control parameter");
  }
};

const getAllElemiQCP = async (req, res) => {
  try {
    const result = await prisma.qualityControlParameter.findMany();
    res.json({
      message: "Retrieved all elemi quality control parameter",
      qualityControlParameterList: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to retrieve data elemi quality control parameter");
  }
};

const getSingleElemiQCP = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.qualityControlParameter.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved elemi quality control parameter",
      qualityControlParameter: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateElemiQCP = async (req, res) => {
  const { id } = req.params;
  const {
    tblRows,
    oHSBR,
    totalROW,
    sAR,
    refNumber,
    rMBNumber,
    outboundDate,
    remarks,
    releasedBy,
    receivedBy,
  } = req.body;
  try {
    const result = await prisma.qualityControlParameter.update({
      where: { id: Number(id) },
      data: {
        tblRows,
        oHSBR,
        totalROW,
        sAR,
        refNumber,
        rMBNumber,
        outboundDate,
        remarks,
        releasedBy,
        receivedBy,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Updated elemi quality control parameter",
      qualityControlParameter: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteElemiQCP = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.qualityControlParameter.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted elemi quality control parameter",
      qualityControlParameter: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createElemiQCP,
  getAllElemiQCP,
  getSingleElemiQCP,
  updateElemiQCP,
  deleteElemiQCP,
};
