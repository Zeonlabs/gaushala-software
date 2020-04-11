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
//aavela pashu
const saveAnimalIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animal = req.body;
        const animalIncomeRepo = new repository_1.AnimalIncomeRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const doc = yield animalIncomeRepo.save(animal);
        const { stats } = yield variablesRepo.updateAnimals(animal.animal).inc();
        //adding entry to animal stmt report
        animalStmtRepo.saveToAnimalStmt(doc.date, {
            added: doc.total,
            small: stats.animal.small,
            big: stats.animal.big,
            other: stats.animal[10]
        });
        res.json({ animal: doc, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
});
exports.saveAnimalIncome = saveAnimalIncome;
const deleteAnimalIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const animalIncomeRepo = new repository_1.AnimalIncomeRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const doc = yield animalIncomeRepo.delete(id);
        const { stats } = yield variablesRepo.updateAnimals(doc.animal).dec();
        //updating animal stmt report
        animalStmtRepo.saveToAnimalStmt(doc.date, {
            added: -doc.total,
            small: stats.animal.small,
            big: stats.animal.big,
            other: stats.animal[10]
        });
        res.json({ animal: doc, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
});
exports.deleteAnimalIncome = deleteAnimalIncome;
const editAnimalIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const animalIncome = req.body;
        let stats;
        const animalIncomeRepo = new repository_1.AnimalIncomeRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const animalStmtRepo = new repository_1.AnimalStmtRepository();
        const doc = yield animalIncomeRepo.update(id, animalIncome);
        if (animalIncome.animal) {
            yield variablesRepo.updateAnimals(doc.oldAnimals.animal).dec();
            stats = yield variablesRepo.updateAnimals(doc.updatedAnimalIncome.animal).inc();
        }
        else {
            stats = yield variablesRepo.get();
        }
        //updating animal stmt report
        animalStmtRepo.saveToAnimalStmt(doc.updatedAnimalIncome.date, {
            added: -doc.oldAnimals.total + doc.updatedAnimalIncome.total,
            small: stats.stats.animal.small,
            big: stats.stats.animal.big,
            other: stats.stats.animal[10]
        });
        res.json({ animal: doc.updatedAnimalIncome, stats: stats.stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.editAnimalIncome = editAnimalIncome;
//# sourceMappingURL=animalIncome.controller.js.map