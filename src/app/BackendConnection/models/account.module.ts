export interface ILogin{
    email:string;
    password:string;
}

export interface IRegister extends ILogin{
    username:string;
    firstName: string;
    name:string;
    address: string;
    accountId:number;
}

export interface ILoginResponse{
    accessToken:string;
}

export interface IUser{
    id:number;
    email:string;
    username:string;
    firstName: string;
    name:string;
    addres:string;
}