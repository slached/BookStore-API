const { Book } = require("../models");

class BookRepository {
  constructor() {}

  async GetBookList() {
    try {
      return await Book.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "score"],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async CreateBook(book) {
    try {
      const newBook = await Book.create(book);
      return newBook;
    } catch (error) {
      console.error("Error creating book:", error);
    }
  }

  async FindBookById(userId) {
    try {
      return await Book.findByPk(userId);
    } catch (error) {
      throw error;
    }
  }
}
module.exports = BookRepository;
