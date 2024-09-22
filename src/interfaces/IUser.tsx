export interface IUser {
    id: string|number;
    username: string;
    password: string;
    email: string;
    address: string;
    role: boolean;
    phone: string;
    dateCreated: Date;
}