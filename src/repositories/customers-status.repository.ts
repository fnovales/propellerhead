import {DefaultCrudRepository} from '@loopback/repository';
import {CustomersStatus, CustomersStatusRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CustomersStatusRepository extends DefaultCrudRepository<
  CustomersStatus,
  typeof CustomersStatus.prototype.id,
  CustomersStatusRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(CustomersStatus, dataSource);
  }
}
