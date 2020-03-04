import { DefaultCrudRepository } from '@loopback/repository';
import { Notes, NotesRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare class NotesRepository extends DefaultCrudRepository<Notes, typeof Notes.prototype.id, NotesRelations> {
    constructor(dataSource: DbDataSource);
}
