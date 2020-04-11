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
const saveAnimalCost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animalExpense = req.body;
        const animalExpenseRepo = new repository_1.AnimalCostRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const { stats } = yield variablesRepo.updateCapital(animalExpense.total).dec();
        //adds total numbers of aniamls available at a entry date
        animalExpense.total_animal = stats.animal.big + stats.animal.small + stats.animal[10];
        const savedDoc = yield animalExpenseRepo.save(animalExpense);
        res.json({ expense: savedDoc, stats });
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
exports.saveAnimalCost = saveAnimalCost;
const deleteAnimalCost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const animalExpenseRepo = new repository_1.AnimalCostRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const deletedDoc = yield animalExpenseRepo.delete(id);
        const { stats } = yield variablesRepo.updateCapital(deletedDoc.total).inc();
        res.json({ expense: deletedDoc, stats });
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
exports.deleteAnimalCost = deleteAnimalCost;
const editAnimalCost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const animalExpense = req.body;
        let stats;
        const animalExpenseRepo = new repository_1.AnimalCostRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const expense = yield animalExpenseRepo.update(id, animalExpense);
        if (animalExpense.total) {
            stats = yield variablesRepo.updateCapital(expense.oldDoc.total - expense.updatedDoc.total).inc();
        }
        else {
            stats = yield variablesRepo.get();
        }
        res.json({ expense: expense.updatedDoc, stats: stats.stats });
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
exports.editAnimalCost = editAnimalCost;
//# sourceMappingURL=animalCost.controller.js.map