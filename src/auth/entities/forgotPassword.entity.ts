export class ForgotPasswordEntity {
    message: string;

    constructor(partial: Partial<ForgotPasswordEntity>) {
        Object.assign(this, partial);
    }
}
