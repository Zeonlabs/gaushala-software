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
const saveExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = req.body;
        const expenseRepo = new repository_1.ExpenseRepository();
        const variableRepo = new repository_1.VariablesRepository();
        const savedExpense = yield expenseRepo.save(expense);
        const { stats } = yield variableRepo.updateCapital(savedExpense.money.amount).dec();
        res.json({ expense: savedExpense, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.saveExpense = saveExpense;
const editExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseId = req.params.id;
        const expense = req.body;
        var stats;
        const expenseRepo = new repository_1.ExpenseRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const doc = yield expenseRepo.update(expenseId, expense);
        if (expense.money) {
            stats = yield variablesRepo.updateCapital(doc.oldAmount - doc.updatedExpense.money.amount).inc();
        }
        else {
            stats = yield variablesRepo.get();
        }
        res.json({ expense: doc.updatedExpense, stats: stats.stats });
    }
    catch (e) {
        console.log(e);
        res.status(e.code || 400).send({ message: e.message });
    }
});
exports.editExpense = editExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseId = req.params.id;
        const expenseRepo = new repository_1.ExpenseRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const deletedExpense = yield expenseRepo.delete(expenseId);
        const { stats } = yield variablesRepo.updateCapital(deletedExpense.money.amount).inc();
        res.send({ expense: deletedExpense, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send();
    }
});
exports.deleteExpense = deleteExpense;
//# sourceMappingURL=expense.controller.js.map