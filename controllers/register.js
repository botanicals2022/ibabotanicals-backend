const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const { generateAccessToken, generateRefreshToken } = require("./authToken");

const register = async (req, res) => {
  try {
    // Get user input
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

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password: encryptedPassword,
        contact: {
          create: {
            email: email.toLowerCase(), // sanitize: convert email to lowercase
          },
        },
      },
    });

    // remove password
    // delete user["password"];

    const accessToken = generateAccessToken({ userId: user.id, username });
    const refreshToken = generateRefreshToken({ userId: user.id, username });

    // save user token
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = register;
