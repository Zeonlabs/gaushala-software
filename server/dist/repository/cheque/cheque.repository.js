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
class ChequeRepository {
    save(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const cheque = new schema_1.Cheque(data);
            const doc = yield cheque.save();
            return doc;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedDoc = yield schema_1.Cheque.findByIdAndDelete(id);
            return deletedDoc;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDoc = yield schema_1.Cheque.findByIdAndUpdate(id, { $set: data }, { new: true });
            return updatedDoc;
        });
    }
    filter({ dateFrom = null, dateTo = null, chequeNo = null, name = null, phone = null, amountFrom = null, amountTo = null, bank = null }) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            if (dateFrom && dateTo)
                query['date'] = {
                    $gte: new Date(dateFrom), $lt: new Date(dateTo)
                };
            if (chequeNo)
                query['no'] = chequeNo;
            if (name)
                query['name'] = name;
            if (phone)
                query['phone'] = phone;
            if (amountFrom && amountTo)
                query['amount'] = {
                    $gte: amountFrom, $lt: amountTo
                };
            if (bank)
                query['bank'] = bank;
            const records = yield schema_1.Cheque.find(query).sort({ _id: -1 });
            return records;
        });
    }
}
exports.ChequeRepository = ChequeRepository;
//# sourceMappingURL=cheque.repository.js.map