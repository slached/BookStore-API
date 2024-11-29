require("dotenv").config();
require("colors");

const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const { rateLimit } = require("express-rate-limit");
const { PORT } = require("./config");
const { User } = require("./app");
const { DB } = require("./database");

const StartServer = async () => {
  // Connect DB

  try {
    await DB.authenticate();
    console.log("Database connection established!".blue.underline.bold);
    await DB.sync({ alter: true });
    console.log("Tables synchronized!".bgBlack.underline.bold);
  } catch (error) {
    console.error("Error connecting to the database:".red.underline.bold, error);
  }

  //middlewares
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(limiter);
  app.use(morgan("combined"));
  app.use(
    // @ts-ignore
    helmet({
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "example.com"],
        },
      },
    })
  );

  // Controllers
  User(app);

  app
    .listen(PORT)
    .on("listening", () => {
      console.log(`Server listening on port ${PORT}`.green.underline.bold);
    })
    .on("error", (err) => {
      console.log(err.message.red.underline.bold);
    });
};

StartServer();
