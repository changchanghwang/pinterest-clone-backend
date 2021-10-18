const Joi = require('joi');

module.exports = {
  Joi,
  signUpSchema: Joi.object({
    userId: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    password: Joi.string()
      .required()
      .min(8)
      .pattern(/^[a-zA-Z0-9]{8,}$/),
    age: Joi.number().required(),
  }),
};
