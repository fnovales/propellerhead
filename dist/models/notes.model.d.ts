import { Entity } from '@loopback/repository';
export declare class Note extends Entity {
    id: number;
    description: string;
    creation: string;
    customerId: number;
    etag: string;
    [prop: string]: any;
    constructor(data?: Partial<Note>);
}
export interface NotesRelations {
}
export declare type NotesWithRelations = Note & NotesRelations;
