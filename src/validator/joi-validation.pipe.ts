// joi-validation.pipe.ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema: Joi.ObjectSchema) {}

    transform(value: any) {
        const { error } = this.schema.validate(value);

        if (error) {
            const errorMessage = this.formatErrorMessages(error.details);
            throw new BadRequestException(errorMessage);
        }

        return value;
    }

    private formatErrorMessages(details: Joi.ValidationErrorItem[]) {
        // Convert the validation error details to a meaningful error message
        const messages = details.map((detail) => {
            // Remove double quotes around the field name
            return `${detail.message.replace(/"/g, '')}`;
        });

        return messages.join(', ');
    }
}
