import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'foo@bar.com', required: true })
    email: string;
    @ApiProperty({ example: '12345678', required: true })
    password: string;
}
