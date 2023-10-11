import { ApiProperty } from '@nestjs/swagger';

export class RegisterEntity {
    @ApiProperty({
        example: 'your_access_token_example_here',
        description: 'This is jwt token',
    })
    access_token: string;

    constructor(partial: Partial<RegisterEntity>) {
        Object.assign(this, partial);
    }
}
