"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const DeadAnimalSchema = new mongoose_1.default.Schema({
    date: Date,
    note: String,
    animal: [
        {
            type: {
                type: Number
            },
            count: Number
        }
    ]
});
DeadAnimalSchema.plugin(mongoose_paginate_v2_1.default);
exports.DeadAnimal = mongoose_1.default.model('dead_animal', DeadAnimalSchema);
//# sourceMappingURL=deadAnimal.schema.js.map