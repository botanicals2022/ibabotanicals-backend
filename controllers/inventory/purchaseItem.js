const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPurchaseItem = async (req, res) => {
  // const { type } = req.body;
  const {
    piid,
    name,
    quantity,
    quality,
    price,
    batchCode,
    type,
    supplier,
    contact,
    address,
  } = req.body;

  const tmpid = piid ? piid.toUpperCase() : "";
  let childPurchase = {};

  switch (type) {
    case "raw material":
      childPurchase = {
        rawMaterial: {
          create: {
            rmid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "fuel":
      childPurchase = {
        fuel: {
          create: {
            fid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "laboratory":
      childPurchase = {
        laboratoryConsumable: {
          create: {
            lid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "maintenance":
      childPurchase = {
        maintenanceConsumable: {
          create: {
            mid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "office":
      childPurchase = {
        officeConsumable: {
          create: {
            oid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "other":
      childPurchase = {
        otherConsumable: {
          create: {
            othid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    default:
      return res.status(400).send("Error in selecting purchase type");
  }

  // console.log("childPurchase", childPurchase);
  try {
    const result = await prisma.purchaseItem.create({
      data: {
        piid: piid,
        name,
        quantity,
        quality,
        price,
        batchCode,
        type,
        supplier,
        contact,
        address,
        userId: req.user.userId,
        ...childPurchase,
      },
    });

    res.json({ message: "Created new purchase item", purchaseItem: result });
  } catch (err) {
    return res.status(400).send("Unable to create purchase item");
  }
};

const getAllPurchaseItem = async (req, res) => {
  try {
    const result = await prisma.purchaseItem.findMany();
    res.json({
      message: "Retrieved all purchase item",
      purchaseItemList: result,
    });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data purchase item");
  }
};

const getSinglePurchaseItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.purchaseItem.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved purchase item", purchaseItem: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updatePurchaseItem = async (req, res) => {
  const { id } = req.params;
  const {
    piid,
    quantity,
    quality,
    name,
    supplier,
    address,
    type,
    dateOfDelivery,
    updatedAt,
  } = req.body;

  const tmpid = piid ? piid.toUpperCase() : "";
  let childPurchase = {};

  switch (type) {
    case "raw material":
      childPurchase = {
        rawMaterial: {
          create: {
            rmid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "fuel":
      childPurchase = {
        fuel: {
          create: {
            fid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "laboratory":
      childPurchase = {
        laboratoryConsumable: {
          create: {
            lid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "maintenance":
      childPurchase = {
        maintenanceConsumable: {
          create: {
            mid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "office":
      childPurchase = {
        officeConsumable: {
          create: {
            oid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    case "other":
      childPurchase = {
        otherConsumable: {
          create: {
            othid: tmpid,
            name,
            quantity,
            quality,
            price,
            batchCode,
            supplier,
            contact,
            address,
            userId: req.user.userId,
          },
        },
      };
      break;
    default:
      return res.status(400).send("Error in selecting purchase type");
  }

  try {
    const result = await prisma.purchaseItem.update({
      where: { id: Number(id) },
      data: {
        piid,
        quantity,
        quality,
        name,
        supplier,
        address,
        type,
        dateOfDelivery,
        updatedAt,
        userId: req.user.userId,
        ...childPurchase,
      },
    });
    res.json({ message: "Updated purchase item", purchaseItem: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};

const deletePurchaseItem = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.purchaseItem.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted purchase item", purchaseItem: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createPurchaseItem,
  getAllPurchaseItem,
  getSinglePurchaseItem,
  updatePurchaseItem,
  deletePurchaseItem,
};
