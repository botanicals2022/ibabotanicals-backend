// Required External Modules
const express = require("express");
const cors = require("cors");

// Route Middlewares
// const { verifyToken } = require("./middleware/auth");

// const whitelist = ["http://localhost:3005", "http://localhost:3001"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

const app = express();
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

// const { refreshToken, logout } = require("./routes/refreshToken");
const refreshToken = require("./routes/refreshToken");
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");

const user = require("./routes/user");
// const staff = require("./routes/staff");
const contact = require("./routes/contact");

const elemiReceiveOil = require("./routes/elemi/oils/receiveOil");
const elemiProcessOil = require("./routes/elemi/oils/processOil");
const elemiFinalOil = require("./routes/elemi/oils/finalOil");

const elemiProcess = require("./routes/elemi/forms/elemiProcess");
const qualityControlParameter = require("./routes/elemi/forms/qualityControlParameter");
const materialRequestForm = require("./routes/elemi/forms/materialRequestForm");
const transmittalForLaboratory = require("./routes/elemi/forms/transmittalForLaboratory");
const transmittalForProduction = require("./routes/elemi/forms/transmittalForProduction");

const elemi = require("./routes/elemi/elemi");
const elemiLaboratory = require("./routes/elemi/elemiLaboratory");
const extractedElemi = require("./routes/elemi/extractedElemi");
const elemiInventory = require("./routes/elemi/elemiInventory");
const material = require("./routes/material");

const office = require("./routes/inventory/consumable/office");
const laboratory = require("./routes/inventory/consumable/laboratory");
const maintenance = require("./routes/inventory/consumable/maintenance");
const other = require("./routes/inventory/consumable/other");
const fuel = require("./routes/inventory/fuel");
const elemiFuel = require("./routes/inventory/elemiFuel");
const rawMaterial = require("./routes/inventory/rawMaterial");
const purchaseItem = require("./routes/inventory/purchaseItem");

const ticket = require("./routes/ticket");

const notFoundRoute = require("./controllers/notFound");

// Routes Definitions
// app.get("/", verifyToken, (req, res) => {
//   res.status(200).send("Welcome 🙌 ");
// });

app.use("/auth/refreshToken", refreshToken);
app.use("/register", register);
app.use("/login", login);
app.use("/logout", logout);

app.use("/api/user", user);
app.use("/api/contact", contact);

// oils
app.use("/api/elemi/oil/receive", elemiReceiveOil);
app.use("/api/elemi/oil/process", elemiProcessOil);
app.use("/api/elemi/oil/final", elemiFinalOil);

// forms
app.use("/api/elemi/process", elemiProcess);
app.use("/api/elemi/quality-control-parameter", qualityControlParameter);
app.use("/api/elemi/material-request-form", materialRequestForm);
app.use("/api/elemi/transmittal-laboratory", transmittalForLaboratory);
app.use("/api/elemi/transmittal-production", transmittalForProduction);

app.use("/api/elemi/inventory", elemiInventory);
app.use("/api/elemi/extracted", extractedElemi);
app.use("/api/elemi/laboratory", elemiLaboratory);
app.use("/api/elemi", elemi);
app.use("/api/material", material);

app.use("/api/inventory/consumable/maintenance", maintenance);
app.use("/api/inventory/consumable/laboratory", laboratory);
app.use("/api/inventory/consumable/office", office);
app.use("/api/inventory/consumable/other", other);

app.use("/api/inventory/fuel", fuel);
app.use("/api/inventory/elemi-fuel", elemiFuel);
app.use("/api/inventory/raw-material", rawMaterial);
app.use("/api/inventory/purchase-item", purchaseItem);

app.use("/api/support/ticket", ticket);

app.use("*", notFoundRoute);

module.exports = app;
