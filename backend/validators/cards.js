const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9]{24}$/),
  }),
});

const cardDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

module.exports = {
  idValidator,
  cardDataValidator,
};
