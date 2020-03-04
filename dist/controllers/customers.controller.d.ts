import { Count, Filter, Where } from '@loopback/repository';
import { Customers } from '../models';
import { CustomersRepository } from '../repositories';
export declare class CustomersController {
    customersRepository: CustomersRepository;
    constructor(customersRepository: CustomersRepository);
    create(customers: Omit<Customers, 'id'>): Promise<Customers>;
    count(where?: Where<Customers>): Promise<Count>;
    find(filter?: Filter<Customers>): Promise<Customers[]>;
    updateAll(customers: Customers, where?: Where<Customers>): Promise<Count>;
    findById(id: number, filter?: Filter<Customers>): Promise<Customers>;
    updateById(id: number, customers: Customers): Promise<void>;
    replaceById(id: number, customers: Customers): Promise<void>;
    deleteById(id: number): Promise<void>;
}
