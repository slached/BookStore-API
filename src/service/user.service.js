const { UserRepository, BookRepository } = require("../database/repositories");
const { NotFoundError, BadContentError } = require("../utils/error/error.types");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.bookRepository = new BookRepository();
  }
  async getUserList() {
    return await this.userRepository.GetUserList();
  }

  async getUserById(userId) {
    const user = await this.userRepository.GetUserById(userId);

    const allPastBook = [];
    const allPresentBook = [];
    for (const pastBook of user?.dataValues.books.past) {
      allPastBook.push({
        name: (await this.bookRepository.FindBookById(pastBook.bookId))?.dataValues.name,
        userScore: pastBook.userScore,
      });
    }
    for (const presentBook of user?.dataValues.books.present) {
      allPresentBook.push({ name: (await this.bookRepository.FindBookById(presentBook.bookId))?.dataValues.name });
    }

    return {
      id: user?.dataValues.id,
      name: user?.dataValues.name,
      books: {
        past: allPastBook,
        present: allPresentBook,
      },
    };
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

    // if the same book already borrowed by user
    const lookForBorrowed = user.dataValues?.books ? user.dataValues.books.present.filter((book) => book.bookId === bookId) : [];
    if (lookForBorrowed.length !== 0) throw new BadContentError(`Book With Id ${bookId} is already borrowed by you.`);

    // if book borrowed by someone else
    if (!(await this.userRepository.IsBookReadyToBorrow(bookId)))
      throw new BadContentError(`Book With Id ${bookId} is not available for borrow.`);

    await this.userRepository.BorrowBook(user, bookId);
    return `${user.dataValues.name} borrowed a book successfully`;
  }

  async returnBook(userId, bookId, score) {
    const user = await this.userRepository.FindUserById(userId);
    const book = await this.bookRepository.FindBookById(bookId);
    // if user is null so there is no user founded
    if (!user) throw new NotFoundError(`User With Id ${userId} Could Not Founded`);
    if (!book) throw new NotFoundError(`Book With Id ${bookId} Could Not Founded`);

    // if book is not borrowed yet
    const lookForBorrowed = user.dataValues?.books ? user.dataValues.books?.present.filter((book) => book.bookId === bookId) : [];
    if (lookForBorrowed.length === 0) throw new BadContentError(`Book With Id ${bookId} is not in your borrowed list.`);

    //return book to the lib
    await this.userRepository.ReturnBook(user, bookId, score);

    //then delete this book in present book list
    await this.userRepository.DeleteBookInPresentBookList(user, bookId);

    return `${user.dataValues.name} returned a book successfully`;
  }
}
module.exports = UserService;
