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
const constants_common_1 = require("../../common/constants.common");
const utils_common_1 = require("../../common/utils.common");
const exceptions_common_1 = require("../../common/exceptions.common");
class VariablesRepository {
    create(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const variables = new schema_1.Variables(doc);
            const savedVars = yield variables.save();
            return {
                name: savedVars.name,
                stats: savedVars.stats
            };
        });
    }
    saveInitInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield schema_1.Variables.findByIdAndUpdate(constants_common_1.VAR_DOC_ID, { $set: Object.assign(Object.assign({}, data), { loggedIn: true }) }, { new: true });
            return doc;
        });
    }
    updateInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield schema_1.Variables.findByIdAndUpdate(constants_common_1.VAR_DOC_ID, { $set: data }, { new: true });
            return doc;
        });
    }
    updateCapital(amount) {
        const genQuery = (value) => schema_1.Variables.findByIdAndUpdate(constants_common_1.VAR_DOC_ID, { $inc: { "stats.capital": value } }, { new: true });
        return {
            inc: () => __awaiter(this, void 0, void 0, function* () { return yield genQuery(amount); }),
            dec: () => __awaiter(this, void 0, void 0, function* () { return yield genQuery(-amount); })
        };
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const vars = yield schema_1.Variables.findById(constants_common_1.VAR_DOC_ID);
            return vars;
        });
    }
    updateAnimals(animals) {
        const genQuery = (animals) => {
            let query = {
                'stats.animal.small': 0,
                'stats.animal.big': 0
            };
            animals.forEach(animal => {
                query[`stats.animal.${animal.type}`] = animal.count;
                if (animal.type < 5) {
                    query["stats.animal.small"] += animal.count;
                }
                else if (animal.type < 9) {
                    query["stats.animal.big"] += animal.count;
                }
            });
            return schema_1.Variables.findByIdAndUpdate(constants_common_1.VAR_DOC_ID, { $inc: Object.assign({}, query) }, { new: true });
        };
        return {
            inc: () => __awaiter(this, void 0, void 0, function* () { return yield genQuery(animals); }),
            dec: () => __awaiter(this, void 0, void 0, function* () { return yield genQuery(animals.map(ani => ({ type: ani.type, count: -ani.count }))); })
        };
    }
    issueOtp() {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedVars = yield schema_1.Variables.findByIdAndUpdate(constants_common_1.VAR_DOC_ID, { $set: { otp: utils_common_1.genOtp() } }, { new: true });
            return { otp: updatedVars.otp, phone: updatedVars.phone };
        });
    }
    getOtp() {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp } = yield schema_1.Variables.findById(constants_common_1.VAR_DOC_ID, { _id: -1, otp: 1 });
            return otp;
        });
    }
    resetPin(userOtp, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            const vars = yield this.get();
            if (vars.otp != userOtp)
                throw new exceptions_common_1.WrongOtpException();
            const updatedVars = yield schema_1.Variables.findByIdAndUpdate(constants_common_1.VAR_DOC_ID, { $set: { pin }, $unset: { otp: 1 } }, { new: true });
            return null;
        });
    }
}
exports.VariablesRepository = VariablesRepository;
//# sourceMappingURL=variables.repository.js.map