const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Users = require("./user");
// const Staffs = require("./staff");
const SOPS = require("./elemi/forms/process");
const TransFProd = require("./elemi/forms/production");
const TransFLab = require("./elemi/forms/laboratory");
const MRFS = require("./elemi/forms/mrf");
const ReceiveOil = require("./elemi/oils/receive");
const ProcessOil = require("./elemi/oils/process");

const LaboratoryConsm = require("./inventory/consumables/laboratory");
const MaintenanceConsm = require("./inventory/consumables/maintenance");
const OfficeConsm = require("./inventory/consumables/office");
const OtherConsm = require("./inventory/consumables/other");

const FuelMainTank = require("./inventory/fuel/mainTank");
const ElemiTank = require("./inventory/fuel/elemiTank");

const Ticket = require("./ticket");

const isDummyData = true;

async function runSeeders() {
  // Users
  await Promise.all(
    Users.map(async (user) =>
      // change upsert to create when initialization
      prisma.user.create({
        data: user,
      })
    )
  );

  if (!isDummyData) return;

  // Elemi process form request
  await Promise.all(
    SOPS.map(async (forms) =>
      prisma.elemiProcess.create({
        data: forms,
      })
    )
  );
  // Elemi transmittal for production form request
  await Promise.all(
    TransFProd.map(async (forms) =>
      prisma.transmittalForProduction.create({
        data: forms,
      })
    )
  );
  // Elemi transmittal for laboratory form request
  await Promise.all(
    TransFLab.map(async (forms) =>
      prisma.transmittalForLaboratory.create({
        data: forms,
      })
    )
  );
  // Elemi Material request form
  await Promise.all(
    MRFS.map(async (forms) =>
      prisma.materialRequestForm.create({
        data: forms,
      })
    )
  );
  // Elemi Oil
  // receive
  await Promise.all(
    ReceiveOil.map(async (oils) =>
      prisma.elemiReceiveOil.create({
        data: oils,
      })
    )
  );
  // process
  await Promise.all(
    ProcessOil.map(async (oils) =>
      prisma.elemiProcessedOil.create({
        data: oils,
      })
    )
  );

  // Inventory Fuel
  await Promise.all(
    FuelMainTank.map(async (fuel) =>
      prisma.fuel.create({
        data: fuel,
      })
    )
  );
  // Elemi Inventory Fuel
  await Promise.all(
    ElemiTank.map(async (fuel) =>
      prisma.elemiFuel.create({
        data: fuel,
      })
    )
  );

  // Laboratory Consumables
  await Promise.all(
    LaboratoryConsm.map(async (consm) =>
      prisma.laboratoryConsumable.create({
        data: consm,
      })
    )
  );
  // Office Consumables
  await Promise.all(
    OfficeConsm.map(async (consm) =>
      prisma.officeConsumable.create({
        data: consm,
      })
    )
  );
  // Other Consumables
  await Promise.all(
    OtherConsm.map(async (consm) =>
      prisma.otherConsumable.create({
        data: consm,
      })
    )
  );
  // Maintenance Consumables
  await Promise.all(
    MaintenanceConsm.map(async (consm) =>
      prisma.maintenanceConsumable.create({
        data: consm,
      })
    )
  );

  await Promise.all(
    Ticket.map(async (ticket) =>
      prisma.ticket.create({
        data: ticket,
      })
    )
  );

  // Staffs
  // await Promise.all(
  //   Staffs.map(async (staff) =>
  //     prisma.staff.create({
  //       data: staff,
  //     })
  //   )
  // );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Successfully seeded database. Closing connection.");
    await prisma.$disconnect();
  });
