import { Entity } from '@loopback/repository';
export declare class CustomersStatus extends Entity {
    id: number;
    name: string;
    [prop: string]: any;
    constructor(data?: Partial<CustomersStatus>);
}
export interface CustomersStatusRelations {
}
export declare type CustomersStatusWithRelations = CustomersStatus & CustomersStatusRelations;
