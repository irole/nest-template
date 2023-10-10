// validation.schema.ts
import * as Joi from 'joi';

export const profileUpdateSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(25).required().messages({
        'string.base': 'First Name must be a string',
        'string.empty': 'First Name is required',
        'string.min': 'First Name must be at least 2 characters long',
        'string.max': 'First Name must be less than 25 characters',
    }),
    lastName: Joi.string().trim().min(2).max(25).required().messages({
        'string.base': 'Last Name must be a string',
        'string.empty': 'Last Name is required',
        'string.min': 'Last Name must be at least 2 characters long',
        'string.max': 'Last Name must be less than 25 characters',
    }),
});
