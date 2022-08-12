const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createLaboratory = async (req, res) => {
  const {
    lid,
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

  const tmplid = lid ? lid.toUpperCase() : "";

  try {
    const result = await prisma.laboratoryConsumable.create({
      data: {
        lid: tmplid,
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
      message: "Created new laboratory consumable",
      laboratoryConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create laboratory consumable");
  }
};

const createLaboratoryPurchaseItem = async (req, res) => {
  const {
    lid,
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

  const tmplid = lid ? lid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.create({
      data: {
        piid: tmplid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        type: "laboratory",
        supplier,
        contact,
        address,
        userId: req.user.userId,
        laboratoryConsumable: {
          create: {
            lid: tmplid,
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
      message: "Created new laboratory consumable",
      laboratoryConsumable: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Unable to create laboratory consumable");
  }
};

const getAllLaboratory = async (req, res) => {
  try {
    const result = await prisma.laboratoryConsumable.findMany();
    res.json({
      message: "Retrieved all laboratory consumable",
      laboratoryConsumables: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to retrieve data laboratory consumable");
  }
};

const getSingleLaboratory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.laboratoryConsumable.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved laboratory consumable",
      laboratoryConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateLaboratory = async (req, res) => {
  const { id } = req.params;
  const {
    lid,
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

  const tmplid = lid ? lid.toUpperCase() : "";

  try {
    const result = await prisma.laboratoryConsumable.update({
      where: { id: Number(id) },
      data: {
        lid: tmplid,
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
    res.json({
      message: "Updated laboratory consumable",
      laboratoryConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const updateLaboratoryPurchaseItem = async (req, res) => {
  const { id } = req.params;
  const {
    lid,
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

  const tmplid = lid ? lid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.update({
      where: { id: Number(id) },
      data: {
        piid: tmplid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        userId: req.user.userId,
        laboratoryConsumable: {
          update: {
            lid: tmplid,
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
    res.json({
      message: "Updated laboratory consumable",
      laboratoryConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteLaboratory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.laboratoryConsumable.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted laboratory consumable",
      laboratoryConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createLaboratory,
  createLaboratoryPurchaseItem,
  getAllLaboratory,
  getSingleLaboratory,
  updateLaboratory,
  updateLaboratoryPurchaseItem,
  deleteLaboratory,
};
