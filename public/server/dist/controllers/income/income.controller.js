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
const saveIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const income = req.body;
        const incomeRepo = new repository_1.IncomeRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const savedIncome = yield incomeRepo.save(income);
        const { stats } = yield variablesRepo.updateCapital(savedIncome.money.amount).inc();
        res.send({ income: savedIncome, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send();
    }
});
exports.saveIncome = saveIncome;
const editIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomeId = req.params.id;
        const income = req.body;
        var stats;
        const incomeRepo = new repository_1.IncomeRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const doc = yield incomeRepo.update(incomeId, income);
        if (income.money) {
            stats = yield variablesRepo.updateCapital(-doc.oldAmount + doc.updatedIncome.money.amount).inc();
        }
        else {
            stats = yield variablesRepo.get();
        }
        res.json({ income: doc.updatedIncome, stats: stats.stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send();
    }
});
exports.editIncome = editIncome;
const deleteIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomeId = req.params.id;
        const incomeRepo = new repository_1.IncomeRepository();
        const variablesRepo = new repository_1.VariablesRepository();
        const deletedIncome = yield incomeRepo.delete(incomeId);
        const { stats } = yield variablesRepo.updateCapital(deletedIncome.money.amount).dec();
        res.send({ income: deletedIncome, stats });
    }
    catch (e) {
        console.log(e);
        res.status(400).send();
    }
});
exports.deleteIncome = deleteIncome;
//# sourceMappingURL=income.controller.js.map