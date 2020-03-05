import { DefaultCrudRepository } from '@loopback/repository';
import { Note, NotesRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare class NotesRepository extends DefaultCrudRepository<Note, typeof Note.prototype.id, NotesRelations> {
    constructor(dataSource: DbDataSource);
}
