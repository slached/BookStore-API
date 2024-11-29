const { createUserSchema, createBookSchema } = require("../../validation/validator.schemas");

const userValidator = (req, res, next) => {
  const { error, value } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  next();
};

const bookValidator = (req, res, next) => {
  const { error, value } = createBookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  next();
};

module.exports = {
  userValidator,
  bookValidator,
};
