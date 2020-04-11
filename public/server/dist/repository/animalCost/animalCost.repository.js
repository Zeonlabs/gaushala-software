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
class AnimalCostRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const animalExpense = new schema_1.AnimalCost(data);
            const savedDoc = yield animalExpense.save();
            return savedDoc;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedDoc = yield schema_1.AnimalCost.findByIdAndDelete(id);
            return deletedDoc;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldDoc = yield schema_1.AnimalCost.findById(id, { _id: 0, total: 1 });
            const updatedDoc = yield schema_1.AnimalCost.findByIdAndUpdate(id, { $set: data }, { new: true });
            return { updatedDoc, oldDoc };
        });
    }
}
exports.AnimalCostRepository = AnimalCostRepository;
//# sourceMappingURL=animalCost.repository.js.map