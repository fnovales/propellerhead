import { Entity } from '@loopback/repository';
export declare class Notes extends Entity {
    id: number;
    description: string;
    creation: string;
    customerId: number;
    [prop: string]: any;
    constructor(data?: Partial<Notes>);
}
export interface NotesRelations {
}
export declare type NotesWithRelations = Notes & NotesRelations;
