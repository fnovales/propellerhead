import {DefaultCrudRepository} from '@loopback/repository';
import {Note, NotesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NotesRepository extends DefaultCrudRepository<
  Note,
  typeof Note.prototype.id,
  NotesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Note, dataSource);
  }
}
