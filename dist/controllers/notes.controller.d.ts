import { Count, Filter, Where } from '@loopback/repository';
import { Notes } from '../models';
import { NotesRepository } from '../repositories';
export declare class NotesController {
    notesRepository: NotesRepository;
    constructor(notesRepository: NotesRepository);
    create(notes: Omit<Notes, 'id'>): Promise<Notes>;
    count(where?: Where<Notes>): Promise<Count>;
    find(filter?: Filter<Notes>): Promise<Notes[]>;
    updateAll(notes: Notes, where?: Where<Notes>): Promise<Count>;
    findById(id: number, filter?: Filter<Notes>): Promise<Notes>;
    updateById(id: number, notes: Notes): Promise<void>;
    replaceById(id: number, notes: Notes): Promise<void>;
    deleteById(id: number): Promise<void>;
}
