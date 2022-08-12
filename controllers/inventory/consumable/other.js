const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOther = async (req, res) => {
  const {
    othid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    destination,
    description,
  } = req.body;

  const tmpothid = othid ? othid.toUpperCase() : "";

  try {
    const result = await prisma.otherConsumable.create({
      data: {
        othid: tmpothid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        destination,
        description,
        userId: req.user.userId,
      },
    });
    res.json({
      message: "Created new other consumable",
      otherConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create other consumable");
  }
};

const createOtherPurchaseItem = async (req, res) => {
  const {
    othid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    destination,
    description,
  } = req.body;

  const tmpothid = othid ? othid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.create({
      data: {
        piid: tmpothid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        type: "other",
        supplier,
        contact,
        address,
        userId: req.user.userId,
        otherConsumable: {
          create: {
            othid: tmpothid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            destination,
            description,
            userId: req.user.userId,
          },
        },
      },
    });
    res.json({
      message: "Created new other consumable",
      otherConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create other consumable");
  }
};

const getAllOther = async (req, res) => {
  try {
    const result = await prisma.otherConsumable.findMany();
    res.json({
      message: "Retrieved all other consumable",
      otherConsumables: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data other consumable");
  }
};

const getSingleOther = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.otherConsumable.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved other consumable",
      otherConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateOther = async (req, res) => {
  const { id } = req.params;
  const {
    othid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    destination,
    description,
    dateOfDelivery,
  } = req.body;

  const tmpothid = othid ? othid.toUpperCase() : "";

  try {
    const result = await prisma.otherConsumable.update({
      where: { id: Number(id) },
      data: {
        othid: tmpothid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        destination,
        description,
        dateOfDelivery,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Updated other consumable", otherConsumable: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const updateOtherPurchaseItem = async (req, res) => {
  const { id } = req.params;
  const {
    othid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    destination,
    description,
    dateOfDelivery,
  } = req.body;

  const tmpothid = othid ? othid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.update({
      where: { id: Number(id) },
      data: {
        piid: tmpothid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        userId: req.user.userId,
        otherConsumable: {
          update: {
            othid: tmpothid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            destination,
            description,
            dateOfDelivery,
            userId: req.user.userId,
          },
        },
      },
    });
    res.json({ message: "Updated other consumable", otherConsumable: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteOther = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.otherConsumable.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted other consumable", otherConsumable: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createOther,
  createOtherPurchaseItem,
  getAllOther,
  getSingleOther,
  updateOther,
  updateOtherPurchaseItem,
  deleteOther,
};
