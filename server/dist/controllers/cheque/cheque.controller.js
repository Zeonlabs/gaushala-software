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
const saveCheque = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chequeData = req.body;
        const chequeRepo = new repository_1.ChequeRepository();
        const savedCheque = yield chequeRepo.save(chequeData);
        res.json(savedCheque);
    }
    catch (e) {
        console.log(e);
        res.status(e.code || 400).send({ message: e.message });
    }
});
exports.saveCheque = saveCheque;
const editCheque = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const chequeData = req.body;
        const chequeRepo = new repository_1.ChequeRepository();
        const updatedCheque = yield chequeRepo.update(id, chequeData);
        res.json(updatedCheque);
    }
    catch (e) {
        console.log(e);
        res.status(e.code || 400).send({ message: e.message });
    }
});
exports.editCheque = editCheque;
const deleteCheque = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const chequeRepo = new repository_1.ChequeRepository();
        const deletedCheque = yield chequeRepo.delete(id);
        res.json(deletedCheque);
    }
    catch (e) {
        console.log(e);
        res.status(e.code || 400).send({ message: e.message });
    }
});
exports.deleteCheque = deleteCheque;
const filteredChequeReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chequeRepo = new repository_1.ChequeRepository();
        const records = yield chequeRepo.filter(req.query);
        res.json(records);
    }
    catch (e) {
        console.log(e);
        res.status(e.code || 400).send({ message: e.message });
    }
});
exports.filteredChequeReport = filteredChequeReport;
//# sourceMappingURL=cheque.controller.js.map