export class RegisterEntity {
    access_token: string;
    constructor(partial: Partial<RegisterEntity>) {
        Object.assign(this, partial);
    }
}
