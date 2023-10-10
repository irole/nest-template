// validation.schema.ts
import * as Joi from 'joi';

export const registerSchema = Joi.object({
    password: Joi.string().trim().min(6).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
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
