import { HttpStatus } from '@nestjs/common';

export function success(data: any, statusCode: HttpStatus = HttpStatus.OK) {
    return {
        success: true,
        status: statusCode,
        label: HttpStatus[statusCode],
        result: data,
    };
}

export interface Success<T> {
    success: boolean;
    status: number;
    label: string;
    result: T;
}
