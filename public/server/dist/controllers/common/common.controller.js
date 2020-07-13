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
exports.getMoneyReport = exports.getMoneyReportOLD = exports.smsController = exports.getIncomeExpenseAnalytics = exports.generateFilteredReport = void 0;
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
                    $gte: new Date(dateFrom),
                    $lt: dateEnd
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
        //----------OLD LOGIC-------------
        // const crrntDate = new Date()
        // const prvDate = new Date()
        // prvDate.setMonth(prvDate.getMonth() - 11)
        // prvDate.setDate(1)
        // prvDate.setUTCHours(0,0,0,0)
        //--------------------------------
        const crrntYear = new Date().getFullYear();
        const crrntDate = new Date(crrntYear, 11, 31, 23, 59, 59);
        const prvDate = new Date(crrntYear, 0, 1, 24);
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
        //--------------OLD CODE-------------------
        // const fillUnavailableDatesData = (arr: IncomeModel[] | ExpenseModel[]) => {
        //     const monthlyData = genMonthlyData(arr)
        //     const prvMonth = prvDate.getMonth() + 1
        //     const prvYear = prvDate.getUTCFullYear()
        //     const crrntMonth = crrntDate.getMonth() + 1
        //     const crrntYear = crrntDate.getUTCFullYear()
        //     const pushEmptyData = (month, year) => monthlyData.push({ month, year, amount: 0 })
        //     for(let i = prvMonth; i<=12; i++){
        //         const index = monthlyData.findIndex(data => data.month == i && data.year == prvYear)
        //         if(index < 0) pushEmptyData(i, prvYear)
        //     }
        //     for(let i = 1; i <= crrntMonth; i++){
        //         const index = monthlyData.findIndex(data => data.month == i && data.year == crrntYear)
        //         if(index < 0) pushEmptyData(i, crrntYear)
        //     }
        //     return monthlyData
        // }
        //-----------------------------------------
        const fillUnavailableDatesData = (arr) => {
            const monthlyData = genMonthlyData(arr);
            let formattedMonthlyData = [];
            const pushEmptyData = (month, year) => formattedMonthlyData.push({ month, year, amount: 0 });
            for (let i = 1; i <= 12; i++) {
                const index = monthlyData.findIndex(data => data.month == i);
                if (index < 0)
                    pushEmptyData(i, crrntYear);
                else
                    formattedMonthlyData.push(monthlyData[index]);
            }
            return formattedMonthlyData;
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
exports.getMoneyReportOLD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { year = null, month = null } = req.query;
        const incomeRepo = new repository_1.IncomeRepository();
        const expenseRepo = new repository_1.ExpenseRepository();
        const yearT = parseInt(year) || new Date().getFullYear();
        // const monthT = parseInt(month as string) || new Date().getMonth() + 1
        const startDate = new Date(yearT, 0, 1, 24);
        const endDate = new Date(yearT, 11, 31, 23, 59, 59);
        const [incomeData, expoenseData] = yield Promise.all([
            yield incomeRepo.getForMoneyTypeReport(startDate, endDate),
            yield expenseRepo.getForMoneyTypeReport(startDate, endDate)
        ]);
        let monthsData = [], totalIncome = 0, totalExpense = 0;
        for (let i = 1; i <= 12; i++) {
            const income = incomeData.find(e => e._id == i) || { amount: 0 };
            const expense = expoenseData.find(e => e._id == i) || { amount: 0 };
            monthsData.push({
                month: i,
                income: income.amount,
                expense: expense.amount,
                capital: income.amount - expense.amount
            });
            totalIncome += income.amount;
            totalExpense += expense.amount;
        }
        const reportData = {
            year: yearT,
            income: totalIncome,
            expense: totalExpense,
            capital: totalIncome - totalExpense,
            months: monthsData
        };
        res.send(reportData);
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
exports.getMoneyReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { year = null, month = null } = req.query;
        const incomeRepo = new repository_1.IncomeRepository();
        const expenseRepo = new repository_1.ExpenseRepository();
        const yearT = parseInt(year) || new Date().getFullYear();
        if (month) {
            // const startDate = new Date(yearT, 0, 1, 24)
            // const endDate = new Date(yearT, 11, 31, 23, 59, 59)
            const startDate = new Date(yearT, parseInt(month) - 1, 1);
            const endDate = new Date(yearT, parseInt(month), 0);
            console.log({
                startDate, endDate
            });
            const [incomeData, expoenseData] = yield Promise.all([
                yield incomeRepo.getForMoneyTypeReport(startDate, endDate),
                yield expenseRepo.getForMoneyTypeReport(startDate, endDate)
            ]);
            let totalIncome = 0, totalExpense = 0;
            const formattedIncomes = incomeData.map(income => {
                totalIncome += income.amount;
                return {
                    type: income._id,
                    amount: income.amount
                };
            });
            const formattedExpense = expoenseData.map(expense => {
                totalExpense += expense.amount;
                return {
                    type: expense._id,
                    amount: expense.amount
                };
            });
            const reportData = {
                year: yearT,
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense,
                incomes: formattedIncomes,
                expenses: formattedExpense
            };
            res.send(reportData);
        }
        else {
            const startDate = new Date(yearT, 3, 1);
            const endDate = new Date(yearT + 1, 3, 0);
            console.log({
                startDate, endDate
            });
            const [incomeData, expenseData] = yield Promise.all([
                yield incomeRepo.getForMoneyReport(startDate, endDate),
                yield expenseRepo.getForMoneyReport(startDate, endDate)
            ]);
            let monthsData = [], totalIncome = 0, totalExpense = 0;
            for (let i = 4; i <= 12; i++) {
                const income = incomeData.find(e => e._id == i) || { amount: 0 };
                const expense = expenseData.find(e => e._id == i) || { amount: 0 };
                monthsData.push({
                    month: i,
                    year: yearT,
                    income: income.amount,
                    expense: expense.amount,
                    capital: income.amount - expense.amount
                });
                totalIncome += income.amount;
                totalExpense += expense.amount;
            }
            for (let i = 1; i <= 3; i++) {
                const income = incomeData.find(e => e._id == i) || { amount: 0 };
                const expense = expenseData.find(e => e._id == i) || { amount: 0 };
                monthsData.push({
                    month: i,
                    year: yearT + 1,
                    income: income.amount,
                    expense: expense.amount,
                    capital: income.amount - expense.amount
                });
                totalIncome += income.amount;
                totalExpense += expense.amount;
            }
            const reportData = {
                year: `${yearT}-${yearT + 1}`,
                income: totalIncome,
                expense: totalExpense,
                capital: totalIncome - totalExpense,
                months: monthsData
            };
            res.send(reportData);
        }
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
//# sourceMappingURL=common.controller.js.map