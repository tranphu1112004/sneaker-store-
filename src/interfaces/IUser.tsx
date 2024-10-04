export interface IUser {
    id: string|number;
    username: string;
    password: string;
    email: string;
    address: string;
    role: string;
    phone: string;
    dateCreated: Date;
    IdVoucher: (string | number)[];
}