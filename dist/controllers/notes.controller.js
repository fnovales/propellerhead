"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const core_1 = require("@loopback/core");
const md5_1 = require("ts-md5/dist/md5");
let NotesController = class NotesController {
    constructor(notesRepository, request, response) {
        this.notesRepository = notesRepository;
        this.request = request;
        this.response = response;
    }
    async create(note) {
        //adds hash to note
        note.etag = md5_1.Md5.hashStr(note.customerId.toString() + note.description);
        return this.notesRepository.create(note);
    }
    async count(where) {
        return this.notesRepository.count(where);
    }
    async find(filter) {
        return this.notesRepository.find(filter);
    }
    async findById(id, filter) {
        return this.notesRepository.findById(id, filter);
    }
    async updateById(id, note) {
        const etag = this.getEtagFromRequest(this.request);
        this.addEtagToNote(note);
        const result = await this.notesRepository.updateAll(note, { and: [{ id: id }, { etag: etag }] });
        // note was not updated because no exists or has not the correct etag
        if (result.count === 0) {
            await this.validateNote(id);
        }
    }
    async replaceById(id, note) {
        await this.updateById(id, note);
    }
    async deleteById(id) {
        await this.notesRepository.deleteById(id);
    }
    // validates that etag comes in request
    getEtagFromRequest(request) {
        const etag = request.headers["if-match"];
        if (etag === undefined || etag === null || etag === '' || etag.length === 0) {
            throw new rest_1.HttpErrors.PreconditionRequired();
        }
        return etag;
    }
    // adds etag hash to note
    addEtagToNote(note) {
        note.etag = md5_1.Md5.hashStr(note.customerId.toString() + note.description);
    }
    // validates that note exists or the etag is invalid
    async validateNote(id) {
        if (await this.notesRepository.exists(id)) {
            throw new rest_1.HttpErrors.PreconditionFailed();
        }
        throw new rest_1.HttpErrors.NotFound();
    }
};
__decorate([
    rest_1.post('/customers/notes', {
        responses: {
            '200': {
                description: 'Notes model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Note) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Note, {
                    title: 'NewNotes',
                    exclude: ['id'],
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "create", null);
__decorate([
    rest_1.get('/customers/notes/count', {
        responses: {
            '200': {
                description: 'Notes model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Note))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "count", null);
__decorate([
    rest_1.get('/customers/notes', {
        responses: {
            '200': {
                description: 'Array of Notes model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Note, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Note))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "find", null);
__decorate([
    rest_1.get('/customers/notes/{id}', {
        responses: {
            '200': {
                description: 'Notes model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Note, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Note))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "findById", null);
__decorate([
    rest_1.patch('/customers/notes/{id}', {
        responses: {
            '204': {
                description: 'Notes PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Note, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Note]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "updateById", null);
__decorate([
    rest_1.put('/customers/notes/{id}', {
        responses: {
            '204': {
                description: 'Notes PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Note]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/customers/notes/{id}', {
        responses: {
            '204': {
                description: 'Notes DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "deleteById", null);
NotesController = __decorate([
    __param(0, repository_1.repository(repositories_1.NotesRepository)),
    __param(1, core_1.inject(rest_1.RestBindings.Http.REQUEST)),
    __param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    __metadata("design:paramtypes", [repositories_1.NotesRepository, Object, Object])
], NotesController);
exports.NotesController = NotesController;
//# sourceMappingURL=notes.controller.js.map