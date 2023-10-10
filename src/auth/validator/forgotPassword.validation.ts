// validation.schema.ts
import * as Joi from 'joi';

export const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email({ tlds: { allow: false } }) // Customize the email validation as needed
        .required()
        .messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email',
        }),
});
