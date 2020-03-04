import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {CustomersStatus} from '../models';
import {CustomersStatusRepository} from '../repositories';

export class StatusController {
  constructor(
    @repository(CustomersStatusRepository)
    public customersStatusRepository : CustomersStatusRepository,
  ) {}

  @get('/customers/status', {
    responses: {
      '200': {
        description: 'Array of CustomersStatus model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CustomersStatus, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CustomersStatus)) filter?: Filter<CustomersStatus>,
  ): Promise<CustomersStatus[]> {
    return this.customersStatusRepository.find(filter);
  }

  @get('/customers/status/{id}', {
    responses: {
      '200': {
        description: 'CustomersStatus model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CustomersStatus, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(CustomersStatus)) filter?: Filter<CustomersStatus>
  ): Promise<CustomersStatus> {
    return this.customersStatusRepository.findById(id, filter);
  }
}
