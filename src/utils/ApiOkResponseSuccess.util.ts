import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SuccessResponseDto } from './response.util';

export const ApiOkResponseSuccess = <DataDto extends Type<unknown>>(dataDto: DataDto, status: number) =>
    applyDecorators(
        ApiExtraModels(SuccessResponseDto, dataDto),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(SuccessResponseDto) },
                    {
                        properties: {
                            result: {
                                type: 'object',
                                properties: {
                                    data: { $ref: getSchemaPath(dataDto) }, // Use 'data' for the object
                                },
                            },
                            status: {
                                type: 'number',
                                default: status,
                            },
                        },
                    },
                ],
            },
        }),
    );
