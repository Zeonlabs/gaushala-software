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
class IncomeRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const income = new schema_1.Income(data);
            const res = yield income.save();
            return res;
        });
    }
    getAmount(incomeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield schema_1.Income.findById(incomeId, { _id: 0, money: 1 });
            return doc.money.amount;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldAmount = yield this.getAmount(id);
            const doc = yield schema_1.Income.findByIdAndUpdate(id, {
                $set: data
            }, { new: true });
            return { updatedIncome: doc, oldAmount };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield schema_1.Income.findByIdAndDelete(id);
            return doc;
        });
    }
    getForAnalytics(dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield schema_1.Income.find({
                date: {
                    $gte: dateFrom, $lt: dateTo
                }
            }, { _id: 0, date: 1, money: 2, type: 3 });
            return records;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const allIncome = yield schema_1.Income.find();
            return allIncome;
        });
    }
}
exports.IncomeRepository = IncomeRepository;
//# sourceMappingURL=income.reposiory.js.map