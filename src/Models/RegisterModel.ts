export class RegisterModel {
    public email: string;
    public password: string;
    public confirm: string;

    public constructor(email?: string, password?: string, confirm?: string) {
        this.email = email || '';
        this.password = password || '';
        this.confirm = confirm || '';
    }
}
