const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createExtractedElemi = async (req, res) => {
  const { product, productCode } = req.body;

  try {
    const result = await prisma.extractedElemi.create({
      data: {
        product,
        productCode,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new extracted", extracted: result });
  } catch (err) {
    return res.status(400).send("Unable to create extracted");
  }
};

const getAllExtractedElemi = async (req, res) => {
  try {
    const result = await prisma.extractedElemi.findMany();
    res.json({ message: "Retrieved all extracted", extractedList: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data extracted");
  }
};

const getSingleExtractedElemi = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.extractedElemi.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved extracted", extracted: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateExtractedElemi = async (req, res) => {
  const { id } = req.params;
  const { product, productCode } = req.body;
  try {
    const result = await prisma.extractedElemi.update({
      where: { id: Number(id) },
      data: { product, productCode, userId: req.user.userId },
    });
    res.json({ message: "Updated extracted", extracted: result });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unable to update data");
  }
};

const deleteExtractedElemi = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.extractedElemi.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted extracted", extracted: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createExtractedElemi,
  getAllExtractedElemi,
  getSingleExtractedElemi,
  updateExtractedElemi,
  deleteExtractedElemi,
};
