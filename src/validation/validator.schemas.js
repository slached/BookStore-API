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

module.exports = { createUserSchema, createBookSchema, returnBookSchema };
