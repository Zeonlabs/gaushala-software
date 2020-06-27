"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../../schema");
class AnimalIncomeRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const animal = new schema_1.AnimalIncome(data);
            const doc = yield animal.save();
            return doc;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield schema_1.AnimalIncome.findByIdAndDelete(id);
            return doc;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldAnimals = yield schema_1.AnimalIncome.findById(id, { _id: 0, animal: 1, total: 2 });
            const doc = yield schema_1.AnimalIncome.findByIdAndUpdate(id, { $set: data }, { new: true });
            return { updatedAnimalIncome: doc, oldAnimals };
        });
    }
}
exports.AnimalIncomeRepository = AnimalIncomeRepository;
//# sourceMappingURL=animalIncome.repository.js.map