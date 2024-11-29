const { createUserSchema, createBookSchema, returnBookSchema } = require("../../validation/validator.schemas");

const createUserValidator = (req, res, next) => {
  const { error, value } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  next();
};

const createBookValidator = (req, res, next) => {
  const { error, value } = createBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  next();
};

const returnBookValidator = (req, res, next) => {
  const { error, value } = returnBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  next();
};

module.exports = {
  createUserValidator,
  createBookValidator,
  returnBookValidator,
};
