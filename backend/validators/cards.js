const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const { badRequestError } = require("../utils/errors");

const idValidator = celebrate({
  params: Joi.object().keys({ id: Joi.string().required().custom(validateID) }),
});

const cardDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
}

function validateID(value) {
  if (/^[a-zA-Z0-9]{24}$/.test(value)) {
    return value;
  }
  return new badRequestError("Invalid ID");
}

module.exports = {
  idValidator,
  cardDataValidator,
};
