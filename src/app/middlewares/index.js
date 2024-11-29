module.exports = {
  CreateUserValidator: require("./joi.validator.mw").createUserValidator,
  CreateBookValidator: require("./joi.validator.mw").createBookValidator,
  ReturnBookValidator: require("./joi.validator.mw").returnBookValidator,
  ParamValidator: require("./joi.validator.mw").paramValidator,
  ParamValidator_2: require("./joi.validator.mw").paramValidator_2,
};
