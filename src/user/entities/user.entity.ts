import { Exclude } from 'class-transformer';

export class UserEntity {
    id: string;
    firstName: string;
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

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
