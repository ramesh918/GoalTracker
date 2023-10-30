const Joi = require("joi");
const updateMonthlyGoalValidation = Joi.object({
  goalId: Joi.string().required(),
  update: Joi.string().required(),
  completion: Joi.number().required(),
});

module.exports = updateMonthlyGoalValidation;
