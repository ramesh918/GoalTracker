const Joi = require('joi');

const monthlyGoalsValidationSchema = Joi.object({
  goal: Joi.string()
    .required()
    .messages({
      'any.required': 'Goal is required.',
    }),
  goalType: Joi.string()
    .required()
    .messages({
      'any.required': 'Goal type is required.',
    }),
  startDate: Joi.date()
    .required()
    .messages({
      'any.required': 'Start date is required.',
      'date.base': 'Start date must be a valid date.',
    }),
  targetDate: Joi.date()
    .required()
    .messages({
      'any.required': 'Target date is required.',
      'date.base': 'Target date must be a valid date.',
    }),
  completion: Joi.number()
    .required()
    .messages({
      'any.required': 'Completion is required.',
      'number.base': 'Completion must be a number.',
    }),
});

module.exports = monthlyGoalsValidationSchema;
