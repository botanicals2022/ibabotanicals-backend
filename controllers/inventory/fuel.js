const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createFuel = async (req, res) => {
  const {
    fid,
    name,
    quantity,
    // withdrawn,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
  } = req.body;

  const tmpfid = fid ? fid.toUpperCase() : "";

  try {
    const result = await prisma.fuel.create({
      data: {
        fid: tmpfid,
        name,
        quantity,
        // withdrawn,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Created new fuel", fuel: result });
  } catch (err) {
    return res.status(400).send("Unable to create fuel");
  }
};

const createFuelPurchaseItem = async (req, res) => {
  const {
    fid,
    name,
    quantity,
    // withdrawn,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
  } = req.body;

  const tmpfid = fid ? fid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.create({
      data: {
        piid: `PI_${tmpfid}`,
        name,
        quantity,
        quality,
        price,
        batchCode,
        type: "fuel",
        supplier,
        contact,
        address,
        userId: req.user.userId,
        fuel: {
          create: {
            fid: tmpfid,
            name,
            quantity,
            // withdrawn,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      },
    });
    res.json({ message: "Created new fuel", fuel: result });
  } catch (err) {
    return res.status(400).send("Unable to create fuel");
  }
};

const getAllFuel = async (req, res) => {
  try {
    const result = await prisma.fuel.findMany();
    res.json({ message: "Retrieved all fuel", fuelList: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data fuel");
  }
};

const getSingleFuel = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.fuel.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved fuel", fuel: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateFuel = async (req, res) => {
  const { id } = req.params;
  const {
    fid,
    name,
    quantity,
    // withdrawn,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    dateOfDelivery,
  } = req.body;

  const tmpfid = fid ? fid.toUpperCase() : "";

  try {
    const result = await prisma.fuel.update({
      where: { id: Number(id) },
      data: {
        fid: tmpfid,
        name,
        quantity,
        // withdrawn,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        dateOfDelivery,
        userId: req.user.userId,
      },
    });
    res.json({ message: "Updated fuel", fuel: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const updateFuelPurchaseItem = async (req, res) => {
  const { id } = req.params;
  const {
    fid,
    name,
    quantity,
    // withdrawn,
    quality,
    price,
    batchCode,
    supplier,
    contact,
    address,
    dateOfDelivery,
  } = req.body;

  const tmpfid = fid ? fid.toUpperCase() : "";

  try {
    const result = await prisma.purchaseItem.update({
      where: { id: Number(id) },
      data: {
        piid: `PI_${tmpfid}`,
        name,
        quantity,
        quality,
        price,
        batchCode,
        supplier,
        contact,
        address,
        userId: req.user.userId,
        fuel: {
          update: {
            fid: tmpfid,
            name,
            quantity,
            // withdrawn,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            dateOfDelivery,
            userId: req.user.userId,
          },
        },
      },
    });
    res.json({ message: "Updated fuel", fuel: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deleteFuel = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.fuel.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted fuel", fuel: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createFuel,
  createFuelPurchaseItem,
  getAllFuel,
  getSingleFuel,
  updateFuel,
  updateFuelPurchaseItem,
  deleteFuel,
};
