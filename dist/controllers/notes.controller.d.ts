/// <reference types="express" />
import { Count, Filter, Where } from '@loopback/repository';
import { Response, Request } from '@loopback/rest';
import { Note } from '../models';
import { NotesRepository } from '../repositories';
export declare class NotesController {
    notesRepository: NotesRepository;
    protected request: Request;
    protected response: Response;
    constructor(notesRepository: NotesRepository, request: Request, response: Response);
    create(note: Omit<Note, 'id'>): Promise<Note>;
    count(where?: Where<Note>): Promise<Count>;
    find(filter?: Filter<Note>): Promise<Note[]>;
    findById(id: number, filter?: Filter<Note>): Promise<Note>;
    updateById(id: number, note: Note): Promise<void>;
    replaceById(id: number, note: Note): Promise<void>;
    deleteById(id: number): Promise<void>;
    getEtagFromRequest(request: Request): string;
    addEtagToNote(note: Note): void;
    validateNote(id: number): Promise<void>;
}
