export class ResetPasswordEntity {
    message: string;

    constructor(partial: Partial<ResetPasswordEntity>) {
        Object.assign(this, partial);
    }
}
