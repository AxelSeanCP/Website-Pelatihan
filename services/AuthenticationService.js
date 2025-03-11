const db = require("../models");
const { Op } = require("sequelize");
const { BadRequestError } = require("../exceptions");

const addRefreshToken = async (token) => {
  await db.Authentication.create({ token });
};

const verifyRefreshToken = async (token) => {
  const refreshToken = await db.Authentication.findOne({ where: { token } });

  if (!refreshToken) {
    throw new BadRequestError("Invalid refresh token");
  }
};

const deleteRefreshToken = async (token) => {
  await db.Authentication.destroy({ where: { token } });
};

module.exports = { addRefreshToken, verifyRefreshToken, deleteRefreshToken };
