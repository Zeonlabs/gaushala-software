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
class DeadAnimalRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(data)
            const deadAnimal = new schema_1.DeadAnimal(data);
            const doc = yield deadAnimal.save();
            return doc;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldDeadAnimal = yield schema_1.DeadAnimal.findById(id, { _id: 0, animal: 1 });
            const updatedDeadAnimal = yield schema_1.DeadAnimal.findByIdAndUpdate(id, { $set: data }, { new: true });
            return { updatedDeadAnimal, oldDeadAnimal };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedDoc = yield schema_1.DeadAnimal.findByIdAndDelete(id);
            return deletedDoc;
        });
    }
}
exports.DeadAnimalRepository = DeadAnimalRepository;
//# sourceMappingURL=deadAnimal.repository.js.map