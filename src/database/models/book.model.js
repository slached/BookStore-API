const { DataTypes } = require("sequelize");
const { DB } = require("..");

const Book = DB.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: -1,
    },
  },
  {
    tableName: "books",
    timestamps: true,
  }
);

module.exports = Book;
