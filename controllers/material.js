const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createMaterial = async (req, res) => {
  const { material, materialId } = req.body;

  try {
    const result = await prisma.material.create({
      data: {
        material,
        materialId,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new material", material: result });
  } catch (err) {
    return res.status(400).send("Unable to create material");
  }
};

const getAllMaterial = async (req, res) => {
  try {
    const result = await prisma.material.findMany();
    res.json({ message: "Retrieved all material", materials: result });
  } catch (err) {
    return res.status(200).send("Unable to retrieve data material");
  }
};

const getSingleMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.material.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved material", material: result });
  } catch (err) {
    return res.status(200).send("Unable to retrieve data");
  }
};

const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { material, materialId } = req.body;
  try {
    const result = await prisma.material.update({
      where: { id: Number(id) },
      data: { material, materialId, userId: req.user.userId },
    });
    res.json({ message: "Updated material", material: result });
  } catch (err) {
    return res.status(200).send("Unable to update data");
  }
};

const deleteMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.material.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted material", material: result });
  } catch (err) {
    return res.status(200).send("Unable to delete data");
  }
};

module.exports = {
  createMaterial,
  getAllMaterial,
  getSingleMaterial,
  updateMaterial,
  deleteMaterial,
};
