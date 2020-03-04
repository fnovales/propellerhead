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
let CustomersController = class CustomersController {
    constructor(customersRepository) {
        this.customersRepository = customersRepository;
    }
    async create(customers) {
        return this.customersRepository.create(customers);
    }
    async count(where) {
        return this.customersRepository.count(where);
    }
    async find(filter) {
        return this.customersRepository.find(filter);
    }
    async updateAll(customers, where) {
        return this.customersRepository.updateAll(customers, where);
    }
    async findById(id, filter) {
        return this.customersRepository.findById(id, filter);
    }
    async updateById(id, customers) {
        await this.customersRepository.updateById(id, customers);
    }
    async replaceById(id, customers) {
        await this.customersRepository.replaceById(id, customers);
    }
    async deleteById(id) {
        await this.customersRepository.deleteById(id);
    }
};
__decorate([
    rest_1.post('/customers', {
        responses: {
            '200': {
                description: 'Customers model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Customers) } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Customers, {
                    title: 'NewCustomers',
                    exclude: ['id'],
                }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "create", null);
__decorate([
    rest_1.get('/customers/count', {
        responses: {
            '200': {
                description: 'Customers model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Customers))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "count", null);
__decorate([
    rest_1.get('/customers', {
        responses: {
            '200': {
                description: 'Array of Customers model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Customers, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Customers))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "find", null);
__decorate([
    rest_1.patch('/customers', {
        responses: {
            '200': {
                description: 'Customers PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    __param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Customers, { partial: true }),
            },
        },
    })),
    __param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Customers))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Customers, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "updateAll", null);
__decorate([
    rest_1.get('/customers/{id}', {
        responses: {
            '200': {
                description: 'Customers model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Customers, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Customers))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findById", null);
__decorate([
    rest_1.patch('/customers/{id}', {
        responses: {
            '204': {
                description: 'Customers PATCH success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Customers, { partial: true }),
            },
        },
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Customers]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "updateById", null);
__decorate([
    rest_1.put('/customers/{id}', {
        responses: {
            '204': {
                description: 'Customers PUT success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.Customers]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "replaceById", null);
__decorate([
    rest_1.del('/customers/{id}', {
        responses: {
            '204': {
                description: 'Customers DELETE success',
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "deleteById", null);
CustomersController = __decorate([
    __param(0, repository_1.repository(repositories_1.CustomersRepository)),
    __metadata("design:paramtypes", [repositories_1.CustomersRepository])
], CustomersController);
exports.CustomersController = CustomersController;
//# sourceMappingURL=customers.controller.js.map