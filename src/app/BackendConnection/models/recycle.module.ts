export interface IRecycle{
    id: number;
    name: string;
    hours:string;
    address: string;
    countries?:ICountry[];
    cities?:ICity[];
    materials:IMaterial[];
}

export interface ICreateBoardCenter{
    name:string;
}
export interface ICountry{
    id:number;
    name:string;
}

export interface ICity{
    id:number;
    name:string;
}

export interface IMaterial{
    id: number;
    type: string;
    amount: string;
}