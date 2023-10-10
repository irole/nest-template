export class LoginEntity {
    access_token: string;
    refresh_token: string;
    constructor(partial: Partial<LoginEntity>) {
        Object.assign(this, partial);
    }
}
