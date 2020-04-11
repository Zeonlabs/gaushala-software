"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const animalIncomeSchema = new mongoose_1.default.Schema({
    date: Date,
    name: String,
    address: String,
    phone: Number,
    total: Number,
    animal: [
        {
            type: {
                type: Number
            },
            count: Number
        }
    ]
});
animalIncomeSchema.plugin(mongoose_paginate_v2_1.default);
exports.AnimalIncome = mongoose_1.default.model('animal_income', animalIncomeSchema);
//# sourceMappingURL=animalIncome.schema.js.map