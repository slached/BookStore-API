const Sequelize = require("sequelize");
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

  async GetUserById(userId) {
    try {
      return await User.findByPk(userId, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
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

  async BorrowBook(user, bookId) {
    try {
      return await user.update({
        books: Sequelize.literal(`jsonb_set(books, '{present}', books->'present' || '${JSON.stringify({ bookId: bookId })}')`),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async ReturnBook(user, bookId, score) {
    try {
      return await user.update({
        books: Sequelize.literal(
          `jsonb_set(books, '{past}', books->'past' || '${JSON.stringify({ bookId: bookId, userScore: score })}')`
        ),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async DeleteBookInPresentBookList(user, bookId) {
    try {
      // this query just pop specified book by bookId from books.present
      return await user.update({
        books: Sequelize.literal(
          `jsonb_set(
        books,
        '{present}',
        COALESCE(
          (
            SELECT jsonb_agg(elem)
            FROM jsonb_array_elements(books->'present') elem
            WHERE elem->>'bookId' != '${bookId}'
          ),
          '[]'::jsonb
        )
      )`
        ),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async IsBookReadyToBorrow(bookId) {
    try {
      return (
        //this is query for book we want to borrow is available for the borrow
        //if length of the query 0 that means none of the users borrowed that book
        //so book ready to borrow
        (
          await User.findAll({
            where: Sequelize.literal(`
    EXISTS (
      SELECT 1
      FROM jsonb_array_elements(books->'present') elem
      WHERE elem->>'bookId' = '${bookId}'
    )
  `),
          })
        ).length === 0
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = UserRepository;
