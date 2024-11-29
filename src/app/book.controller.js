const { BookService } = require("../service");
const { CreateBookValidator } = require("./middlewares");

const Book = (app) => {
  const bookService = new BookService();

  app.get("/books", async (req, res, next) => {
    try {
      res.status(200).json(await bookService.getBookList());
    } catch (err) {
      next(err);
    }
  });

  app.post("/books", CreateBookValidator, async (req, res, next) => {
    try {
      const book = req.body;
      res.status(200).json(await bookService.createBook(book));
    } catch (err) {
      next(err);
    }
  });
};

module.exports = Book;
