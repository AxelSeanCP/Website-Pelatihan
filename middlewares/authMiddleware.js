const { verifyToken } = require("../utils/TokenManager");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      status: "fail",
      message: "Access token not available",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    req.credentials = verifyToken(token, process.env.ACCESS_TOKEN_KEY);
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;
