const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { generateAccessToken, generateRefreshToken } = require("./authToken");

const login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await prisma.user.findUnique({
      where: { username: String(username) },
    });

    if (!user) {
      return res.status(400).send(`Username ${username} not found`);
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user["password"];

      const accessToken = generateAccessToken({ userId: user.id, username });
      const refreshToken = generateRefreshToken({ userId: user.id, username });

      // save user token
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;

      // return user
      res.status(200).json(user);
    } else {
      res.status(400).send(`Password is incorrect for user ${username}`);
    }
  } catch (err) {
    res.status(400).send("Invalid Credentials");
  }
};

module.exports = login;
