const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
});

const createBookSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
});

const returnBookSchema = Joi.object({
  score: Joi.number().min(0).max(10).required().messages({
    "number.empty": "Score is required",
    "number.min": "Score must be greater than 0!",
    "number.max": "Score must be lesser than 10!",
  }),
});

const paramSchema = Joi.object({
  userId: Joi.string()
    .pattern(/^\d+$/)
    .custom((value, helpers) => {
      if (isNaN(Number(value))) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "string.pattern.base": "Value must be a numeric string.",
      "any.invalid": "Value must be a string containing a number.",
    }),
  bookId: Joi.string()
    .pattern(/^\d+$/)
    .custom((value, helpers) => {
      if (isNaN(Number(value))) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "string.pattern.base": "Value must be a numeric string.",
      "any.invalid": "Value must be a string containing a number.",
    }),
});

const paramSchema_2 = Joi.object({
  bookId: Joi.string()
    .pattern(/^\d+$/)
    .custom((value, helpers) => {
      if (isNaN(Number(value))) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "string.pattern.base": "Value must be a numeric string.",
      "any.invalid": "Value must be a string containing a number.",
    }),
});

module.exports = { createUserSchema, createBookSchema, returnBookSchema, paramSchema, paramSchema_2 };
