"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const commonType = {
    type: Number,
    default: 0
};
const AnimalStmtSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true
    },
    added: commonType,
    given: commonType,
    dead: commonType,
    small: commonType,
    big: commonType,
    other: commonType
});
AnimalStmtSchema.plugin(mongoose_paginate_v2_1.default);
exports.AnimalStmt = mongoose_1.default.model('animal_stmt', AnimalStmtSchema);
//# sourceMappingURL=animalStmt.schema.js.map