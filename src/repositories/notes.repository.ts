import {DefaultCrudRepository} from '@loopback/repository';
import {Notes, NotesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NotesRepository extends DefaultCrudRepository<
  Notes,
  typeof Notes.prototype.id,
  NotesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Notes, dataSource);
  }
}
