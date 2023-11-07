const Joi = require('joi');

// Define the validation schema for the dailyGoals with custom error messages
const dailyGoalsSchema = Joi.object({
  dayOfEntry: Joi.date().required().messages({
    'any.required': 'Day of entry is required.',
    'date.base': 'Day of entry must be a valid date.',
  }),
  todoList: Joi.array().items(Joi.string()).messages({
    'array.base': 'Todo list must be an array.',
    'array.includes': 'Each item in the todo list must be a string.',
  }),
  checkTodoList: Joi.array().items(Joi.boolean()).messages({
    'array.base': 'Check todo list must be an array.',
    'array.includes': 'Each item in the check todo list must be a boolean.',
  })
});

module.exports = { dailyGoalsSchema };
