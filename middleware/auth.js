const jwt = require("jsonwebtoken");

const config = process.env;

const getToken = (req) => {
  return req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.header("Authorization")
    ? req.header("Authorization").split(/\s/)[1]
    : "";
};

const verifyToken = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = { getToken, verifyToken };
