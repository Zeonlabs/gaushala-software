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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const schema_1 = require("../../schema");
const exceptions_common_1 = require("../../common/exceptions.common");
class EmployeeRepository {
    save(data, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = new schema_1.Employee(data);
            const savedEmployee = yield employee.save();
            return new Promise((resolve, reject) => {
                doc.mv(path_1.join(__dirname, `../../../../employee-docs/${savedEmployee._id}.png`), (err) => {
                    if (err)
                        reject(new exceptions_common_1.ImageUploadFailedException());
                    resolve(savedEmployee);
                });
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deteledDoc = yield schema_1.Employee.findByIdAndDelete(id);
            if (!deteledDoc)
                throw new exceptions_common_1.NoRecordWithIDException();
            return new Promise((resolve, reject) => {
                fs_1.default.unlink(path_1.join(__dirname, `../../../../employee-docs/${id}.png`), (err) => {
                    if (err)
                        reject(err);
                    resolve(deteledDoc);
                });
            });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedDoc = yield schema_1.Employee.findByIdAndUpdate(id, { $set: data }, { new: true });
            if (!updatedDoc)
                throw new exceptions_common_1.NoRecordWithIDException();
            return updatedDoc;
        });
    }
}
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=employee.repository.js.map