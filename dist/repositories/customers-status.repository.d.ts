import { DefaultCrudRepository } from '@loopback/repository';
import { CustomersStatus, CustomersStatusRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare class CustomersStatusRepository extends DefaultCrudRepository<CustomersStatus, typeof CustomersStatus.prototype.id, CustomersStatusRelations> {
    constructor(dataSource: DbDataSource);
}
