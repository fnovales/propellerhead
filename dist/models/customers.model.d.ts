import { Entity } from '@loopback/repository';
export declare class Customers extends Entity {
    id: number;
    statusId: number;
    creation: string;
    name: string;
    email?: string;
    phoneNumber?: string;
    [prop: string]: any;
    constructor(data?: Partial<Customers>);
}
export interface CustomersRelations {
}
export declare type CustomersWithRelations = Customers & CustomersRelations;
