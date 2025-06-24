const Joi = require("joi");

const userValidate = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().email().lowercase().required(), 
    password: Joi.string().max(50).min(6).required(),
    fullName: Joi.string().max(50).required(),
    role: Joi.string(),
    employeeNumber: Joi.string().optional(),
    dateOfBirth: Joi.string().isoDate().optional(),
    department: Joi.string().optional(),
    skills: Joi.string().optional(),
    phoneNumber: Joi.string().pattern(/^\d+$/).optional(),
    avatar: Joi.string().uri().optional(),
    learningGoals: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
    isFirstLogin: Joi.boolean().optional(),
  });

  return userSchema.validate(data);
};

module.exports = {
  userValidate,
};
