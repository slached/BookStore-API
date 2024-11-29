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
  score: Joi.number().required().messages({
    "number.empty": "Score is required",
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

module.exports = { createUserSchema, createBookSchema, returnBookSchema, paramSchema };
