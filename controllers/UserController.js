const UsersValidator = require("../validators/users");
const { createUser, getUser } = require("../services/UserService");

class UserController {
  async create(req, res, next) {
    try {
      UsersValidator.validateUserPayload(req.body);
      const userId = await createUser(req.body);
      res
        .status(201)
        .json({ status: "success", message: "User created", data: { userId } });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const user = await getUser(req.params.id);
      res.status(200).json({ status: "success", data: { user } });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
