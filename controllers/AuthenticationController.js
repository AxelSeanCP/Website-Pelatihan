const { verifyUserCredentials } = require("../services/UserService");
const {
  addRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
} = require("../services/AuthenticationService");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../utils/TokenManager");
const AuthenticationsValidator = require("../validators/authentications");

class AuthenticationController {
  async postAuthentication(req, res, next) {
    try {
      AuthenticationsValidator.validateLoginPayload(req.body);

      const { id } = await verifyUserCredentials(req.body);

      const accessToken = generateAccessToken({ id });
      const refreshToken = generateRefreshToken({ id });

      await addRefreshToken(refreshToken);

      res.status(201).json({
        status: "success",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async putAuthentication(req, res, next) {
    try {
      AuthenticationsValidator.validateAuthenticationPayload(req.body);

      const { refreshToken } = req.body;
      const { id } = verifyToken(refreshToken, process.env.REFRESH_TOKEN_KEY);
      await verifyRefreshToken(refreshToken);

      const accessToken = generateAccessToken({ id });
      res.status(200).json({
        status: "success",
        message: "Access token has been refreshed",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAuthentication(req, res, next) {
    try {
      AuthenticationsValidator.validateAuthenticationPayload(req.body);

      const { refreshToken } = req.body;
      await verifyRefreshToken(refreshToken);
      await deleteRefreshToken(refreshToken);

      res.status(200).json({
        status: "success",
        message: "Refresh token deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthenticationController();
