const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
});

module.exports = { userSchema };
