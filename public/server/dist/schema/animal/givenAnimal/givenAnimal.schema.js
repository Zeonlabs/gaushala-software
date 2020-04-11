"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const GivenAnimalSchema = new mongoose_1.default.Schema({
    date: Date,
    tag: Number,
    name: String,
    phone: Number,
    address: String,
    animal: [
        {
            type: {
                type: Number
            },
            count: Number
        }
    ]
});
GivenAnimalSchema.plugin(mongoose_paginate_v2_1.default);
exports.GivenAnimal = mongoose_1.default.model('given-animal', GivenAnimalSchema);
//# sourceMappingURL=givenAnimal.schema.js.map