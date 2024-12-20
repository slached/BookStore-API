const { BookRepository, UserRepository } = require("../database/repositories");
const _ = require("lodash");
const { NotFoundError } = require("../utils/error/error.types");
class BookService {
  constructor() {
    this.bookRepository = new BookRepository();
    this.userRepository = new UserRepository();
  }
  async getBookList() {
    return await this.bookRepository.GetBookList();
  }

  async getBookById(bookId) {
    const book = (await this.bookRepository.FindBookById(bookId))?.dataValues;

    if (book === undefined) throw new NotFoundError(`Book With Id ${bookId} Could Not Founded`);

    const allScoresThatBelongsThisBook = [];
    for (const user of await this.userRepository.GetAllUsersByBookId(bookId)) {
      for (const past of user.dataValues.books.past) {
        if (past.bookId === bookId) allScoresThatBelongsThisBook.push(past.userScore);
      }
    }

    const bookScoreOverall = _.sum(allScoresThatBelongsThisBook) / allScoresThatBelongsThisBook.length;

    return {
      id: book.id,
      name: book.name,
      score: allScoresThatBelongsThisBook.length !== 0 ? bookScoreOverall : -1,
    };
  }

  async createBook(book) {
    return await this.bookRepository.CreateBook(book);
  }
}
module.exports = BookService;
