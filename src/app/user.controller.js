const { UserService } = require("../service");
const { CreateUserValidator, ReturnBookValidator, ParamValidator } = require("./middlewares");

const User = (app) => {
  const userService = new UserService();

  app.get("/users", async (req, res, next) => {
    try {
      res.status(200).json(await userService.getUserList());
    } catch (err) {
      next(err);
    }
  });

  app.get("/users/:userId", async (req, res, next) => {
    try {
      const { userId } = req.params;
      res.status(200).json(await userService.getUserById(userId));
    } catch (err) {
      next(err);
    }
  });

  app.post("/users", CreateUserValidator, async (req, res, next) => {
    try {
      const user = req.body;
      res.status(201).json(await userService.createUsers(user));
    } catch (err) {
      next(err);
    }
  });

  app.post("/users/:userId/borrow/:bookId", ParamValidator, async (req, res, next) => {
    try {
      const { userId, bookId } = req.params;
      return res.status(201).json(await userService.borrowBook(userId, bookId));
    } catch (err) {
      next(err);
    }
  });

  app.post("/users/:userId/return/:bookId", ReturnBookValidator, ParamValidator, async (req, res, next) => {
    try {
      const { userId, bookId } = req.params;
      const { score } = req.body;
      return res.status(201).json(await userService.returnBook(userId, bookId, score));
    } catch (err) {
      next(err);
    }
  });
};

module.exports = User;
