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
const repository_1 = require("../../repository");
const utils_common_1 = require("../../common/utils.common");
const saveDeadAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deadAnimal = req.body;
        const deadAnimalRepo = new repository_1.DeadAnimalRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const doc = yield deadAnimalRepo.save(deadAnimal);
        const { stats } = yield variablesRepo.updateAnimals(deadAnimal.animal).dec();
        //save animal stmt report
        animalStmtRepo.saveToAnimalStmt(doc.date, {
            dead: utils_common_1.countTotalAnimal(doc.animal),
            small: stats.animal.small,
            big: stats.animal.big,
            other: stats.animal[10]
        });
        res.json({ animal: doc, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.saveDeadAnimal = saveDeadAnimal;
const deleteDeadAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deadAnimalRepo = new repository_1.DeadAnimalRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const deletedDeadAnimal = yield deadAnimalRepo.delete(id);
        const { stats } = yield variablesRepo.updateAnimals(deletedDeadAnimal.animal).inc();
        //update animal stmt report
        animalStmtRepo.saveToAnimalStmt(deletedDeadAnimal.date, {
            dead: -utils_common_1.countTotalAnimal(deletedDeadAnimal.animal),
            small: stats.animal.small,
            big: stats.animal.big,
            other: stats.animal[10]
        });
        res.json({ animal: deletedDeadAnimal, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.deleteDeadAnimal = deleteDeadAnimal;
const editDeadAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deadAnimal = req.body;
        let stats;
        const deadAnimalRepo = new repository_1.DeadAnimalRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const doc = yield deadAnimalRepo.update(id, deadAnimal);
        if (deadAnimal.animal) {
            yield variablesRepo.updateAnimals(doc.oldDeadAnimal.animal).inc();
            stats = yield variablesRepo.updateAnimals(doc.updatedDeadAnimal.animal).dec();
        }
        else {
            stats = yield variablesRepo.get();
        }
        //update animal stmt report
        animalStmtRepo.saveToAnimalStmt(doc.updatedDeadAnimal.date, {
            dead: -utils_common_1.countTotalAnimal(doc.oldDeadAnimal.animal) + utils_common_1.countTotalAnimal(doc.updatedDeadAnimal.animal),
            small: stats.stats.animal.small,
            big: stats.stats.animal.big,
            other: stats.stats.animal[10]
        });
        res.json({ animal: doc.updatedDeadAnimal, stats: stats.stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.editDeadAnimal = editDeadAnimal;
//# sourceMappingURL=deadAnimal.controller.js.map