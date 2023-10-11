import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export function success(data: any, statusCode: HttpStatus = HttpStatus.OK) {
    return {
        success: true,
        status: statusCode,
        label: HttpStatus[statusCode],
        result: data,
    };
}

export class SuccessResponseDto<T> {
    result: T;
    status: number;
    @ApiProperty({ example: 'OK' })
    label: string;
    @ApiProperty({ example: 'true' })
    success: boolean;
}

export interface Success<T> {
    success: boolean;
    status: number;
    label: string;
    result: T;
}
