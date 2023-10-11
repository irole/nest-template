import { ApiProperty } from '@nestjs/swagger';

export class LoginEntity {
    @ApiProperty({
        example: 'your_access_token_example_here',
        description: 'This is jwt token',
    })
    access_token: string;
    @ApiProperty({
        example: 'your_refresh_token_example_here',
        description: 'This is refresh jwt token',
    })
    refresh_token: string;
    constructor(partial: Partial<LoginEntity>) {
        Object.assign(this, partial);
    }
}
