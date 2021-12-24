const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const idValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .pattern(/^[a-zA-Z0-9]{24}$/),
  }),
});

const userLoginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(7).max(50).email(),
    password: Joi.string().required().min(6).max(16),
  }),
});

const userDataValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
}

module.exports = {
  idValidator,
  userLoginValidator,
  userDataValidator,
  avatarValidator,
};
