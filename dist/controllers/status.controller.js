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
let StatusController = class StatusController {
    constructor(customersStatusRepository) {
        this.customersStatusRepository = customersStatusRepository;
    }
    async find(filter) {
        return this.customersStatusRepository.find(filter);
    }
    async findById(id, filter) {
        return this.customersStatusRepository.findById(id, filter);
    }
};
__decorate([
    rest_1.get('/customers/status', {
        responses: {
            '200': {
                description: 'Array of CustomersStatus model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.CustomersStatus, { includeRelations: true }),
                        },
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.CustomersStatus))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "find", null);
__decorate([
    rest_1.get('/customers/status/{id}', {
        responses: {
            '200': {
                description: 'CustomersStatus model instance',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.CustomersStatus, { includeRelations: true }),
                    },
                },
            },
        },
    }),
    __param(0, rest_1.param.path.number('id')),
    __param(1, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.CustomersStatus))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "findById", null);
StatusController = __decorate([
    __param(0, repository_1.repository(repositories_1.CustomersStatusRepository)),
    __metadata("design:paramtypes", [repositories_1.CustomersStatusRepository])
], StatusController);
exports.StatusController = StatusController;
//# sourceMappingURL=status.controller.js.map