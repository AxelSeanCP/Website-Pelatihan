const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../exceptions");

const verifyNewUser = async (username) => {
  const user = await db.User.findOne({ where: { username } });

  if (user) {
    throw new BadRequestError("Username already exists");
  }
};

const createUser = async ({ name, username, password, email }) => {
  await verifyNewUser(username);

  const id = `user-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { id: userId } = await db.User.create({
    id,
    name,
    username,
    password: hashedPassword,
    email,
  });

  return userId;
};

const verifyUserCredentials = async ({ username, password }) => {
  const user = await db.User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    throw new UnauthorizedError("Invalid credentials. Please check username");
  }

  const { id, password: hashedPassword } = user;
  const match = await bcrypt.compare(password, hashedPassword);

  if (!match) {
    throw new UnauthorizedError("Invalid credentials. Please check password");
  }

  return { id };
};

const getUser = async (id) => {
  const user = await db.User.findOne({
    where: {
      id,
    },
    attributes: ["id", "name", "username", "email"],
  });

  if (!user) {
    throw new NotFoundError("Get user failed. User not found");
  }

  return user;
};

module.exports = { createUser, verifyUserCredentials, getUser };
