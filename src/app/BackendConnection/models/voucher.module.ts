import { IUser } from "./account.module";

export interface IVoucher{
    id: number;
    exp_date: Date;
    points:number;
    code:number;
    accountId:number;
    users?:IUser[];
}
