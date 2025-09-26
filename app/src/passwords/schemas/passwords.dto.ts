
export class AddCredentialDTO {
    application: string;
    password: string;
}

export class UpdateCredentialDTO {
    application?: string;
    password?: string;
}