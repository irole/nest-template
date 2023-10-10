// validation.schema.ts
import * as Joi from 'joi';

export const resetPasswordSchema = Joi.object({
    token: Joi.string()
        .trim()
        .required()
        .pattern(new RegExp('^[a-zA-Z0-9-_.]+$')) // You can customize the pattern
        .messages({
            'string.base': 'Token must be a string',
            'string.empty': 'Token is required',
            'string.pattern.base': 'Invalid token format',
        }),
    password: Joi.string().trim().min(6).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
});
