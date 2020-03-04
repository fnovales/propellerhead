import { Filter } from '@loopback/repository';
import { CustomersStatus } from '../models';
import { CustomersStatusRepository } from '../repositories';
export declare class StatusController {
    customersStatusRepository: CustomersStatusRepository;
    constructor(customersStatusRepository: CustomersStatusRepository);
    find(filter?: Filter<CustomersStatus>): Promise<CustomersStatus[]>;
    findById(id: number, filter?: Filter<CustomersStatus>): Promise<CustomersStatus>;
}
