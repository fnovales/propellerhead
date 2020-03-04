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
let NotesController = class NotesController {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    async create(notes) {
        return this.notesRepository.create(notes);
    }
    async count(where) {
        return this.notesRepository.count(where);
    }
    async find(filter) {
        return this.notesRepository.find(filter);
    }
    async updateAll(notes, where) {
        return this.notesRepository.updateAll(notes, where);
    }
    async findById(id, filter) {
        return this.notesRepository.findById(id, filter);
    }
    async updateById(id, notes) {
        await this.notesRepository.updateById(id, notes);
    }
    async replaceById(id, notes) {
        await this.notesRepository.replaceById(id, notes);
    }
    async deleteById(id) {
        await this.notesRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/customers/notes', {
        responses: {
            '200': {
                description: 'Notes model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Notes) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Notes, {
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
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Notes))),
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
                            items: rest_1.getModelSchemaRef(models_1.Notes, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Notes))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "find", null);
__decorate([
    rest_1.patch('/customers/notes', {
        responses: {
            '200': {
                description: 'Notes PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Notes, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Notes))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Notes, Object]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/customers/notes/{id}', {
        responses: {
            '200': {
                description: 'Notes model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Notes, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Notes))),
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
                schema: rest_1.getModelSchemaRef(models_1.Notes, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Notes]),
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
    __metadata("design:paramtypes", [Number, models_1.Notes]),
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
    __metadata("design:paramtypes", [repositories_1.NotesRepository])
], NotesController);
exports.NotesController = NotesController;
//# sourceMappingURL=notes.controller.js.map