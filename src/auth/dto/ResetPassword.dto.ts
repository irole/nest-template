import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({ example: '12345679', required: true })
    password: string;
    @ApiProperty({ example: 'token', required: true })
    token: string;
}
