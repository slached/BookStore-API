const { UserRepository, BookRepository } = require("../database/repositories");
const { NotFoundError } = require("../utils/error/error.types");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.bookRepository = new BookRepository();
  }
  async getUserList() {
    return await this.userRepository.GetUserList();
  }
  async createUsers(users) {
    return await this.userRepository.CreateUser(users);
  }
  async borrowBook(userId, bookId) {
    const user = await this.userRepository.FindUserById(userId);
    const book = await this.bookRepository.FindBookById(bookId);

    // if user is null so there is no user founded
    if (!user) throw new NotFoundError(`User With Id ${userId} Could Not Founded`);
    if (!book) throw new NotFoundError(`Book With Id ${bookId} Could Not Founded`);

    const 

    return 1;
  }
}
module.exports = UserService;
