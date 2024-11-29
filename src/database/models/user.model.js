const { DataTypes } = require("sequelize");
const { DB } = require("../");

const User = DB.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    books: {
      type: DataTypes.JSONB,
      defaultValue: { past: [], present: [] },
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;
