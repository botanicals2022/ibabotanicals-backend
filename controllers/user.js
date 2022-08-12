const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  // Validate user input
  if (!(username && password && firstName && lastName && email)) {
    res.status(400).send("All input is required");
  }

  // check if user already exist
  // Validate if user exist in our database
  const oldUser = await prisma.user.findUnique({
    where: { username: String(username) },
  });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  // const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await prisma.user.create({
      data: {
        firstName,
        lastName,
        contact: {
          create: { email: email.toLowerCase() },
        },
        username,
        password,
      },
    });
    res.json({ message: "Created new user", user: result });
  } catch (err) {
    return res.status(400).send("Unable to create user");
  }
};

const getAllUser = async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    res.json({ message: "Retrieved all user", users: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    res.json({ message: "Retrieved user", user: result });
  } catch (err) {
    return res.status(400).send("Unable to retrieve data");
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, username, password, position, role, status } =
    req.body;

  try {
    const result = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
        username,
        password,
        position,
        role,
        status,
      },
    });
    res.json({ message: "Updated user", user: result });
  } catch (err) {
    return res.status(400).send("Unable to update data");
  }
};
// for user with admin privilege
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ message: "Deleted user", user: result });
  } catch (err) {
    return res.status(400).send("Unable to delete data");
  }
};

module.exports = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
