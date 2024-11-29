const { UserService } = require("../service");
const { UserValidator } = require("./middlewares");

const User = (app) => {
  const userService = new UserService();

  app.get("/users", async (req, res, next) => {
    try {
      res.status(200).json(await userService.getUserList());
    } catch (err) {
      next(err);
    }
  });

  app.post("/users", UserValidator, async (req, res, next) => {
    try {
      const user = req.body;
      res.status(201).json(await userService.createUsers(user));
    } catch (err) {
      next(err);
    }
  });

  app.post("/users/:userId/borrow/:bookId", async (req, res, next) => {
    try {
      const { userId, bookId } = req.params;
      return await userService.borrowBook(userId, bookId);
    } catch (err) {
      next(err);
    }
  });
};

module.exports = User;
