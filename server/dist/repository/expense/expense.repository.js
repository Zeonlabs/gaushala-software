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
const exceptions_common_1 = require("../../common/exceptions.common");
class ExpenseRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const expense = new schema_1.Expense(data);
            return yield expense.save();
        });
    }
    getAmount(expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield schema_1.Expense.findById(expenseId, { _id: 0, money: 1 });
            if (!doc)
                throw new exceptions_common_1.NoRecordWithIDException();
            return doc.money.amount;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldAmount = yield this.getAmount(id);
            const doc = yield schema_1.Expense.findByIdAndUpdate(id, { $set: data }, { new: true });
            return { updatedExpense: doc, oldAmount };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield schema_1.Expense.findByIdAndDelete(id);
            return doc;
        });
    }
    getForAnalytics(dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield schema_1.Expense.find({
                date: {
                    $gte: dateFrom, $lt: dateTo
                }
            }, { _id: 0, date: 1, money: 2, type: 3 });
            return records;
        });
    }
}
exports.ExpenseRepository = ExpenseRepository;
//# sourceMappingURL=expense.repository.js.map