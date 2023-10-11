import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({
        example: 'John',
        description: 'This is firstname',
    })
    firstName: string;
    @ApiProperty({
        example: 'Doe',
        description: 'This is lastname',
    })
    lastName: string;
}
