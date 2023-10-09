// validation.schema.ts
import * as Joi from 'joi';

export const registerSchema = Joi.object({
    password: Joi.string().min(10).required(),
    email: Joi.string().email().required(),
});
