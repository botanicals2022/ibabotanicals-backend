const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createRawMaterial = async (req, res) => {
  const {
    rmid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    description,
  } = req.body;

  const tmprmid = rmid ? rmid.toUpperCase() : "";

  try {
    const result = await prisma.rawMaterial.create({
      data: {
        rmid: tmprmid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        description,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new raw material", rawMaterial: result });
  } catch (err) {
    return res.status(400).send("Unable to create raw material");
  }
};

const createRawMaterialPurchaseItem = async (req, res) => {
  const {
    rmid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    description,
  } = req.body;

  const tmprmid = rmid ? rmid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.create({
      data: {
        piid: `PI_${tmprmid}`,
        name,
        quantity,
        quality,
        price,
        batchCode,
        type: "raw material",
        supplier,
        contact,
        address,
        userId: req.user.userId,
        rawMaterial: {
          create: {
            rmid: tmprmid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            description,
            userId: req.user.userId,
          },
        },
      },
    });
    res.json({ message: "Created new raw material", rawMaterial: result });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unable to create raw material");
  }
};

const getAllRawMaterial = async (req, res) => {
  try {
    const result = await prisma.rawMaterial.findMany();
    res.json({
      message: "Retrieved all raw material",
      rawMaterialList: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data raw material");
  }
};

const getSingleRawMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.rawMaterial.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved raw material", rawMaterial: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateRawMaterial = async (req, res) => {
  const { id } = req.params;
  const {
    rmid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    description,
    dateOfDelivery,
  } = req.body;

  const tmprmid = rmid ? rmid.toUpperCase() : "";

  try {
    const result = await prisma.rawMaterial.update({
      where: { id: Number(id) },
      data: {
        rmid: tmprmid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        description,
        dateOfDelivery,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Updated raw material", rawMaterial: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const updateRawMaterialPurchaseItem = async (req, res) => {
  const { id } = req.params;
  const {
    rmid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    description,
    dateOfDelivery,
  } = req.body;

  const tmprmid = rmid ? rmid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.update({
      where: { id: Number(id) },
      data: {
        piid: `PI_${tmprmid}`,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        userId: req.user.userId,
        rawMaterial: {
          update: {
            rmid: tmprmid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            description,
            dateOfDelivery,
            userId: req.user.userId,
          },
        },
      },
    });
    res.json({ message: "Updated raw material", rawMaterial: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteRawMaterial = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.rawMaterial.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted raw material", rawMaterial: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createRawMaterial,
  createRawMaterialPurchaseItem,
  getAllRawMaterial,
  getSingleRawMaterial,
  updateRawMaterial,
  updateRawMaterialPurchaseItem,
  deleteRawMaterial,
};
