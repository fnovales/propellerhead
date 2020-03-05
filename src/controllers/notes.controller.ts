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
  RestBindings,
  Response, 
  Request,
  HttpErrors,
  stringTypeToWrapper
} from '@loopback/rest';
import {Note} from '../models';
import {NotesRepository} from '../repositories';
import { inject } from '@loopback/core';
import {Md5} from 'ts-md5/dist/md5';

export class NotesController {
  constructor(
    @repository(NotesRepository) public notesRepository : NotesRepository,
    @inject(RestBindings.Http.REQUEST) protected request: Request,
    @inject(RestBindings.Http.RESPONSE) protected response: Response,
    
  ) {}

  @post('/customers/notes', {
    responses: {
      '200': {
        description: 'Notes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Note)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {
            title: 'NewNotes',
            exclude: ['id'],
          }),
        },
      },
    })
    note: Omit<Note, 'id'>,
  ): Promise<Note> {
    //adds hash to note
    note.etag = <string> Md5.hashStr(note.customerId.toString()+note.description);
    return this.notesRepository.create(note);
  }

  @get('/customers/notes/count', {
    responses: {
      '200': {
        description: 'Notes model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Note)) where?: Where<Note>,
  ): Promise<Count> {
    return this.notesRepository.count(where);
  }

  @get('/customers/notes', {
    responses: {
      '200': {
        description: 'Array of Notes model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Note, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Note)) filter?: Filter<Note>,
  ): Promise<Note[]> {
    return this.notesRepository.find(filter);
  }

  @get('/customers/notes/{id}', {
    responses: {
      '200': {
        description: 'Notes model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Note, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.query.object('filter', getFilterSchemaFor(Note)) filter?: Filter<Note>
  ): Promise<Note> {
    return this.notesRepository.findById(id, filter);
  }

  @patch('/customers/notes/{id}', {
    responses: {
      '204': {
        description: 'Notes PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Note, {partial: true}),
        },
      },
    })
    note: Note,
  ): Promise<void> {
    const etag = this.getEtagFromRequest(this.request);
    
    this.addEtagToNote(note);
    
    // try to update the note filtering by "id" and "etag" to do it in an atomic query 
    // to avoid concurrency issues
    const result = await this.notesRepository.updateAll(note, {and:[{id:id}, {etag:etag}]});
    
    // note was not updated because not exists or has not the correct etag
    if (result.count === 0) {
      // if note exists the etag is invalid
      if (await this.notesRepository.exists(id)) {
        throw new HttpErrors.PreconditionFailed();
      } 
      // note does not exists
      throw new HttpErrors.NotFound();
    }
  }

  @put('/customers/notes/{id}', {
    responses: {
      '204': {
        description: 'Notes PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() note: Note,
  ): Promise<void> {
    await this.updateById(id, note);
  }

  @del('/customers/notes/{id}', {
    responses: {
      '204': {
        description: 'Notes DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.notesRepository.deleteById(id);
  }

  // validates that etag comes in request
  getEtagFromRequest(request: Request): string {
    const etag = request.headers["if-match"];
    if (etag === undefined || etag === null || etag === '' || etag.length === 0) {
      throw new HttpErrors.PreconditionRequired();
    }
    return etag;
  }

  // adds etag hash to note
  addEtagToNote(note: Note): void {
    note.etag = <string> Md5.hashStr(note.customerId.toString()+note.description);
  }
}
