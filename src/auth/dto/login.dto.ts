import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'foo@bar.com', required: true })
    email: string;
    @ApiProperty({ example: '12345678', required: true })
    password: string;
}
