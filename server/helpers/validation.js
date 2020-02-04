const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(6)
      .required(),
    emailAddress: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    emailAddress: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });

  // Log user in.
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
