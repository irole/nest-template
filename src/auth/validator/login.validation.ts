// validation.schema.ts
import * as Joi from 'joi';

export const loginSchema = Joi.object({
    password: Joi.string().min(10).required(),
    email: Joi.string().email().required(),
});
