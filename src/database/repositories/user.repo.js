const { Op } = require("sequelize");
const { User } = require("../models");

class UserRepository {
  constructor() {}

  async GetUserList() {
    try {
      return await User.findAll({
        attributes: {
          exclude: ["books", "createdAt", "updatedAt"],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async CreateUser(user) {
    try {
      return await User.create(user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  async FindUserById(userId) {
    try {
      return await User.findByPk(userId);
    } catch (error) {
      throw error;
    }
  }

  async BorrowBook(userId) {
    try {
      return await User.findByPk(userId);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = UserRepository;
