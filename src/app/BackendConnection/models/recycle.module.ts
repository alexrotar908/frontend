export interface IRecycle extends IRecyleCenter{
    id: number;
    type:string;
    amount:number;
}

export interface IRecyleCenter{
    id:number;
    name:string;
    nameCountry:string;
    nameCity:string;
    material: string[];
    hours:string;
    address:string;
}
export interface IRecycleCenterRow{
    id:number;
    name:string;
    nameCountry:ICity;
    nameCity:ICountry;
    material: IMaterial[];
    hours:string;
    address:string;
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
    amount: number;
}