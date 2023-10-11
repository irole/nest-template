import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
    @ApiProperty({
        example: 'id',
        description: 'This is id',
    })
    id: string;
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
    @Exclude()
    superAdmin: boolean;
    @Exclude()
    admin: boolean;
    @Exclude()
    password: string;
    @Exclude()
    isActive: boolean;
    @Exclude()
    isDelete: boolean;
    @Exclude()
    email: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
