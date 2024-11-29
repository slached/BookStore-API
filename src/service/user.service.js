const { UserRepository } = require("../database/repositories");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async getUserList() {
    return await this.userRepository.GetUserList();
  }
  async createUsers(users) {
    return await this.userRepository.CreateUser(users);
  }
}
module.exports = UserService;
