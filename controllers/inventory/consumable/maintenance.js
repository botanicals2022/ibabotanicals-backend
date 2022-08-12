const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createMaintenance = async (req, res) => {
  const {
    mid,
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

  const tmpmid = mid ? mid.toUpperCase() : "";

  try {
    const result = await prisma.maintenanceConsumable.create({
      data: {
        mid: tmpmid,
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
      message: "Created new maintenance consumable",
      maintenanceConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create maintenance consumable");
  }
};

const createMaintenancePurchaseItem = async (req, res) => {
  const {
    mid,
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

  const tmpmid = mid ? mid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.create({
      data: {
        piid: tmpmid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        type: "maintenance",
        supplier,
        contact,
        address,
        userId: req.user.userId,
        maintenanceConsumable: {
          create: {
            mid: tmpmid,
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
      message: "Created new maintenance consumable",
      maintenanceConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to create maintenance consumable");
  }
};

const getAllMaintenance = async (req, res) => {
  try {
    const result = await prisma.maintenanceConsumable.findMany();
    res.json({
      message: "Retrieved all maintenance consumable",
      maintenanceConsumables: result,
    });
  } catch (err) {
    return res
      .status(400)
      .send("Unable to retrieve data maintenance consumable");
  }
};

const getSingleMaintenance = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.maintenanceConsumable.findUnique({
      where: { id: Number(id) },
    });
    res.json({
      message: "Retrieved maintenance consumable",
      maintenanceConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateMaintenance = async (req, res) => {
  const { id } = req.params;
  const {
    mid,
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

  const tmpmid = mid ? mid.toUpperCase() : "";

  try {
    const result = await prisma.maintenanceconsumable.update({
      where: { id: Number(id) },
      data: {
        mid: tmpmid,
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
      message: "Updated maintenance consumable",
      maintenanceConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const updateMaintenancePurchaseItem = async (req, res) => {
  const { id } = req.params;
  const {
    mid,
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

  const tmpmid = mid ? mid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.update({
      where: { id: Number(id) },
      data: {
        piid: tmpmid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        userId: req.user.userId,
        maintenanceConsumable: {
          update: {
            mid: tmpmid,
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
      message: "Updated maintenance consumable",
      maintenanceConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteMaintenance = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.maintenanceConsumable.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({
      message: "Deleted maintenance consumable",
      maintenanceConsumable: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createMaintenance,
  createMaintenancePurchaseItem,
  getAllMaintenance,
  getSingleMaintenance,
  updateMaintenance,
  updateMaintenancePurchaseItem,
  deleteMaintenance,
};
