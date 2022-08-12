const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { getToken } = require("../middleware/auth");

let refreshTokens = [];

const refreshToken = async (req, res) => {
  const { username, token } = req.body;

  if (!username) {
    return res.status(400).send("username input is required");
  }

  // check if user already exist
  // Validate if user exist in our database
  const user = await prisma.user.findUnique({
    where: { username: String(username) },
  });

  if (!refreshTokens.includes(token)) {
    return res.status(400).send("Refresh Token Invalid");
  }
  refreshTokens = refreshTokens.filter((c) => c != token);

  //remove the old refreshToken from the refreshTokens list
  const accessToken = generateAccessToken({ userId: user.id, username });
  const refreshToken = generateRefreshToken({ userId: user.id, username });

  //generate new accessToken and refreshTokens
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

// accessTokens
const generateAccessToken = (object) => {
  return jwt.sign(object, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "2h",
  });
};

// refreshTokens
const generateRefreshToken = (object) => {
  const refreshToken = jwt.sign(object, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "3h",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
};

const logout = (req, res) => {
  const token = getToken(req);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  refreshTokens = refreshTokens.filter((c) => c != token);
  //remove the old refreshToken from the refreshTokens list
  res.status(204).send("Logged out!");
};

module.exports = {
  logout,
  refreshToken,
  generateAccessToken,
  generateRefreshToken,
};
