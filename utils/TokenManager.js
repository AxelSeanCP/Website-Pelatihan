const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../exceptions");

const generateAccessToken = (payload) => {
  const secretKey = process.env.ACCESS_TOKEN_KEY;
  const options = {
    expiresIn: "1h",
  };
  const accessToken = jwt.sign(payload, secretKey, options);
  return accessToken;
};

const generateRefreshToken = (payload) => {
  const secretKey = process.env.REFRESH_TOKEN_KEY;
  const options = {
    expiresIn: "7d",
  };
  const refreshToken = jwt.sign(payload, secretKey, options);
  return refreshToken;
};

const verifyToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new BadRequestError("Invalid or expired token");
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyToken };
