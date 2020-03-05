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
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("@loopback/repository");
let Note = class Note extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
__decorate([
    repository_1.property({
        type: 'number',
        required: false,
        scale: 0,
        id: 1,
        postgresql: { columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: true,
        postgresql: { columnName: 'description', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    __metadata("design:type", String)
], Note.prototype, "description", void 0);
__decorate([
    repository_1.property({
        type: 'date',
        required: false,
        postgresql: { columnName: 'creation', dataType: 'timestamp with time zone', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    __metadata("design:type", String)
], Note.prototype, "creation", void 0);
__decorate([
    repository_1.property({
        type: 'number',
        required: true,
        scale: 0,
        postgresql: { columnName: 'customer_id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
    }),
    __metadata("design:type", Number)
], Note.prototype, "customerId", void 0);
__decorate([
    repository_1.property({
        type: 'string',
        required: false,
        postgresql: { columnName: 'etag', dataType: 'text', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'NO' },
    }),
    __metadata("design:type", String)
], Note.prototype, "etag", void 0);
Note = __decorate([
    repository_1.model({ settings: { idInjection: false, postgresql: { schema: 'public', table: 'notes' } } }),
    __metadata("design:paramtypes", [Object])
], Note);
exports.Note = Note;
//# sourceMappingURL=notes.model.js.map