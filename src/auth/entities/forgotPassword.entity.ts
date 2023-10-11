import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordEntity {
    @ApiProperty({
        example: 'Email Send Successfully',
    })
    message: string;

    constructor(partial: Partial<ForgotPasswordEntity>) {
        Object.assign(this, partial);
    }
}
