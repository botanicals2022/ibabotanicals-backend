const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOffice = async (req, res) => {
  const {
    oid,
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

  const tmpoid = oid ? oid.toUpperCase() : "";

  try {
    const result = await prisma.officeConsumable.create({
      data: {
        oid: tmpoid,
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
      message: "Created new office consumable",
      officeConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create office consumable");
  }
};

const createOfficePurchaseItem = async (req, res) => {
  const {
    oid,
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

  const tmpoid = oid ? oid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.create({
      data: {
        piid: tmpoid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        type: "office",
        supplier,
        contact,
        address,
        userId: req.user.userId,
        officeConsumable: {
          create: {
            oid: tmpoid,
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
      message: "Created new office consumable",
      officeConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create office consumable");
  }
};

const getAllOffice = async (req, res) => {
  try {
    const result = await prisma.officeConsumable.findMany();
    res.json({
      message: "Retrieved all office consumable",
      officeConsumables: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data office consumable");
  }
};

const getSingleOffice = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.officeConsumable.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved office consumable",
      officeConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateOffice = async (req, res) => {
  const { id } = req.params;
  const {
    oid,
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

  const tmpoid = oid ? oid.toUpperCase() : "";

  try {
    const result = await prisma.officeConsumable.update({
      where: { id: Number(id) },
      data: {
        oid: tmpoid,
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
      message: "Updated office consumable",
      officeConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const updateOfficePurchaseItem = async (req, res) => {
  const { id } = req.params;
  const {
    oid,
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

  const tmpoid = oid ? oid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.update({
      where: { id: Number(id) },
      data: {
        piid: tmpoid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        userId: req.user.userId,
        officeConsumable: {
          update: {
            oid: tmpoid,
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
      message: "Updated office consumable",
      officeConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteOffice = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.officeConsumable.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted office consumable",
      officeConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createOffice,
  createOfficePurchaseItem,
  getAllOffice,
  getSingleOffice,
  updateOffice,
  updateOfficePurchaseItem,
  deleteOffice,
};
