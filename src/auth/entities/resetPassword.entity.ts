import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordEntity {
    @ApiProperty({
        example: 'Your password Changed Successfully',
    })
    message: string;

    constructor(partial: Partial<ResetPasswordEntity>) {
        Object.assign(this, partial);
    }
}
