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
const sms_common_1 = require("../../common/sms.common");
const exceptions_common_1 = require("../../common/exceptions.common");
exports.generateFilteredReport = (Model) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dateFrom = null, dateTo = null, type = null, moneyType = null, slipNo = null, chequeNo = null, amountFrom = null, amountTo = null, position = null, tag = null } = req.query;
        const genFilter = () => {
            const query = {};
            if (dateFrom) {
                const dateEnd = new Date(dateTo);
                dateEnd.setHours(23, 59, 59, 0);
                query['date'] = {
                    $gte: new Date(dateFrom), $lt: dateEnd
                };
            }
            if (type)
                query['type'] = type;
            if (moneyType)
                query['money.type'] = moneyType;
            if (chequeNo)
                query['money.cheque_no'] = chequeNo;
            if (slipNo)
                query['slip_no'] = slipNo;
            if (amountFrom && amountTo)
                query['money.amount'] = {
                    $gte: amountFrom, $lt: amountTo
                };
            if (position)
                query['position'] = position;
            if (tag)
                query['tag'] = tag;
            return query;
        };
        const records = yield Model.find(genFilter()).sort({ _id: -1 });
        res.json(records);
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.getIncomeExpenseAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const crrntDate = new Date();
        const prvDate = new Date();
        prvDate.setMonth(prvDate.getMonth() - 11);
        prvDate.setDate(1);
        prvDate.setUTCHours(0, 0, 0, 0);
        const incomeRepo = new repository_1.IncomeRepository();
        const expenseRepo = new repository_1.ExpenseRepository();
        const [incomes, expenses] = yield Promise.all([
            yield incomeRepo.getForAnalytics(prvDate, crrntDate),
            yield expenseRepo.getForAnalytics(prvDate, crrntDate)
        ]);
        const genMonthlyData = (arr) => {
            let monthlyData = [];
            arr.forEach(record => {
                const year = record.date.getUTCFullYear();
                const month = record.date.getMonth() + 1;
                const index = monthlyData.findIndex(data => data.month === month);
                if (index > -1) {
                    monthlyData[index].amount += record.money.amount;
                }
                else {
                    monthlyData.push({
                        month,
                        year,
                        amount: record.money.amount
                    });
                }
            });
            return monthlyData;
        };
        const fillUnavailableDatesData = (arr) => {
            const monthlyData = genMonthlyData(arr);
            const prvMonth = prvDate.getMonth() + 1;
            const prvYear = prvDate.getUTCFullYear();
            const crrntMonth = crrntDate.getMonth() + 1;
            const crrntYear = crrntDate.getUTCFullYear();
            const pushEmptyData = (month, year) => monthlyData.push({ month, year, amount: 0 });
            for (let i = prvMonth; i <= 12; i++) {
                const index = monthlyData.findIndex(data => data.month == i && data.year == prvYear);
                if (index < 0)
                    pushEmptyData(i, prvYear);
            }
            for (let i = 1; i <= crrntMonth; i++) {
                const index = monthlyData.findIndex(data => data.month == i && data.year == crrntYear);
                if (index < 0)
                    pushEmptyData(i, crrntYear);
            }
            return monthlyData;
        };
        res.json({
            income: fillUnavailableDatesData(incomes),
            expense: fillUnavailableDatesData(expenses)
        });
    }
    catch (e) {
        res.status(e.code || 400).send({ message: e.message });
    }
});
exports.smsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phone = req.body.phone;
        const msg = req.body.message;
        const smsRes = yield sms_common_1.sendSms(phone, msg, 'unicode');
        if (smsRes.responseCode == 3011)
            throw new exceptions_common_1.insufficientSmsBalanceException();
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
//# sourceMappingURL=common.controller.js.map