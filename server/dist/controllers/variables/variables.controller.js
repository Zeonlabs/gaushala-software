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
const lodash_1 = __importDefault(require("lodash"));
const repository_1 = require("../../repository");
const exceptions_common_1 = require("../../common/exceptions.common");
const sms_common_1 = require("../../common/sms.common");
const utils_common_1 = require("../../common/utils.common");
const initVariables = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = lodash_1.default.pick(req.body, ['name', 'pin', 'phone']);
        if (!input.pin)
            throw new exceptions_common_1.PinNotFoundException();
        if (!input.phone)
            throw new exceptions_common_1.RequiredInputNotProvidedException();
        const variablesRepo = new repository_1.VariablesRepository();
        const doc = yield variablesRepo.saveInitInfo(input);
        res.send(doc);
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
exports.initVariables = initVariables;
const updateTrustInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = lodash_1.default.pick(req.body, ['name', 'phone']);
        if (!input.name && !input.phone)
            throw new exceptions_common_1.RequiredInputNotProvidedException();
        const variablesRepo = new repository_1.VariablesRepository();
        const doc = yield variablesRepo.updateInfo(input);
        res.send(doc);
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
exports.updateTrustInfo = updateTrustInfo;
const requestOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const variablesRepo = new repository_1.VariablesRepository();
        const { phone, otp } = yield variablesRepo.issueOtp();
        const smsRes = yield sms_common_1.sendSms(phone, `Your software PIN reset OTP is ${otp}`);
        if (smsRes.responseCode == 3011)
            throw new exceptions_common_1.insufficientSmsBalanceException();
        res.send();
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
exports.requestOtp = requestOtp;
const validateOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputOtp = parseInt(req.params.otp);
        const variablesRepo = new repository_1.VariablesRepository();
        const otp = yield variablesRepo.getOtp();
        if (!otp)
            throw new exceptions_common_1.InvalidOtpRequest();
        if (inputOtp != otp)
            throw new exceptions_common_1.InvalidOtpException();
        res.send();
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
exports.validateOtp = validateOtp;
const resetPin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.otp || !body.pin)
            throw new exceptions_common_1.RequiredInputNotProvidedException();
        const variablesRepo = new repository_1.VariablesRepository();
        yield variablesRepo.resetPin(body.otp, body.pin);
        res.send({ message: 'ok' });
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
exports.resetPin = resetPin;
const getVars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const variablesRepo = new repository_1.VariablesRepository();
        const vars = yield variablesRepo.get();
        res.json(vars);
    }
    catch (e) {
        res.status(utils_common_1.getStatusCode(e.code)).send({ message: e.message });
    }
});
exports.getVars = getVars;
//# sourceMappingURL=variables.controller.js.map