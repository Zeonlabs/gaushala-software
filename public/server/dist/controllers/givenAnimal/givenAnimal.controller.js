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
const saveGivenAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const givenAnimal = req.body;
        const givenAnimalRepo = new repository_1.GivenAnimalRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const savedDoc = yield givenAnimalRepo.save(givenAnimal);
        const { stats } = yield variablesRepo.updateAnimals(givenAnimal.animal).dec();
        //save to animal stmt report
        animalStmtRepo.saveToAnimalStmt(savedDoc.date, {
            given: utils_common_1.countTotalAnimal(savedDoc.animal),
            small: stats.animal.small,
            big: stats.animal.big,
            other: stats.animal[10]
        });
        res.json({ animal: savedDoc, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.saveGivenAnimal = saveGivenAnimal;
const deleteGivenAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const givenAnimalRepo = new repository_1.GivenAnimalRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const deletedDoc = yield givenAnimalRepo.delete(id);
        const { stats } = yield variablesRepo.updateAnimals(deletedDoc.animal).inc();
        //update animal stmt report
        animalStmtRepo.saveToAnimalStmt(deletedDoc.date, {
            given: -utils_common_1.countTotalAnimal(deletedDoc.animal),
            small: stats.animal.small,
            big: stats.animal.big,
            other: stats.animal[10]
        });
        res.json({ animal: deletedDoc, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.deleteGivenAnimal = deleteGivenAnimal;
const editGivenAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const givenAnimal = req.body;
        let stats;
        const givenAnimalRepo = new repository_1.GivenAnimalRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const doc = yield givenAnimalRepo.update(id, givenAnimal);
        if (givenAnimal.animal) {
            yield variablesRepo.updateAnimals(doc.oldAnimal.animal).inc();
            stats = yield variablesRepo.updateAnimals(doc.updatedGivenAnimal.animal).dec();
        }
        else {
            stats = yield variablesRepo.get();
        }
        //update animal stmt report
        animalStmtRepo.saveToAnimalStmt(doc.updatedGivenAnimal.date, {
            given: -utils_common_1.countTotalAnimal(doc.oldAnimal.animal) + utils_common_1.countTotalAnimal(doc.updatedGivenAnimal.animal),
            small: stats.stats.animal.small,
            big: stats.stats.animal.big,
            other: stats.stats.animal[10]
        });
        res.json({ animal: doc.updatedGivenAnimal, stats: stats.stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.editGivenAnimal = editGivenAnimal;
//# sourceMappingURL=givenAnimal.controller.js.map