"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const ChequeSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});
ChequeSchema.plugin(mongoose_paginate_v2_1.default);
exports.Cheque = mongoose_1.default.model('cheque', ChequeSchema);
//# sourceMappingURL=cheque.schema.js.map