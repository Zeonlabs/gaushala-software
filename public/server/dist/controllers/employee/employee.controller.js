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
const path_1 = require("path");
const repository_1 = require("../../repository");
const exceptions_common_1 = require("../../common/exceptions.common");
const saveEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req['files'])
            throw new exceptions_common_1.DocsNotProvidedError();
        const doc = req['files'].doc;
        const EmployeeRepo = new repository_1.EmployeeRepository();
        const savedDoc = yield EmployeeRepo.save(req.body, doc);
        res.json(savedDoc);
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
exports.saveEmployee = saveEmployee;
const getEmpDoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        res.download(path_1.join(__dirname, `../../../../employee-docs/${employeeId}.png`), (err) => {
            if (err)
                res.status(404).send({ message: "docs not found" });
        });
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
exports.getEmpDoc = getEmpDoc;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        const EmployeeRepo = new repository_1.EmployeeRepository();
        const deletedDoc = yield EmployeeRepo.delete(employeeId);
        res.json({ _id: deletedDoc['_id'] });
    }
    catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});
exports.deleteEmployee = deleteEmployee;
const editEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const employeeRepo = new repository_1.EmployeeRepository();
        const doc = yield employeeRepo.update(id, data);
        res.json(doc);
    }
    catch (e) {
        res.status(400).send({ message: e.message });
    }
});
exports.editEmployee = editEmployee;
//# sourceMappingURL=employee.controller.js.map