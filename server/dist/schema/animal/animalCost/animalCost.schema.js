"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const AnimalCostSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    total_animal: {
        type: Number,
        required: true
    },
    item: {
        ghas: Number,
        charo: Number,
        dan: Number,
        majuri: Number,
        doctor: Number,
        other: Number
    }
});
AnimalCostSchema.plugin(mongoose_paginate_v2_1.default);
exports.AnimalCost = mongoose_1.default.model('animal_cost', AnimalCostSchema);
//# sourceMappingURL=animalCost.schema.js.map