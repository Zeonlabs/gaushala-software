"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const EmployeeSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: Number,
    address: String
});
EmployeeSchema.plugin(mongoose_paginate_v2_1.default);
exports.Employee = mongoose_1.default.model('employee', EmployeeSchema);
//# sourceMappingURL=employee.schema.js.map