const { BookRepository } = require("../database/repositories");

class BookService {
  constructor() {
    this.bookRepository = new BookRepository();
  }
  async getBookList() {
    return await this.bookRepository.GetBookList();
  }

  async createBook(book) {
    return await this.bookRepository.CreateBook(book);
  }
}
module.exports = BookService;
