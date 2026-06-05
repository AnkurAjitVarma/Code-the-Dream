const Joi = require("joi");

const createUserSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(64).required(),
});

module.exports = {
    createUserSchema,
}