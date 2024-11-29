const { userSchema } = require("../../validation/validator.schemas");

const userValidator = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = value;
  next();
};

module.exports = {
    userValidator
}