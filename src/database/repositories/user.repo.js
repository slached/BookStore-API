const { User } = require("../models");

class UserRepository {
  constructor() {}

  async GetUserList() {
    return await User.findAll();
  }

  async CreateUser(user) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
}
module.exports = UserRepository;
