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
const repository_1 = require("../repository");
const utils_common_1 = require("./utils.common");
exports.auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputPin = req.body.pin;
        const variableRepo = new repository_1.VariablesRepository();
        const vars = yield variableRepo.get();
        if (inputPin == vars.pin) {
            res.status(200).send();
        }
        else if (inputPin == utils_common_1.reverseNum(vars.pin)) {
            res.status(205).send();
        }
        else {
            res.status(401).send();
        }
    }
    catch (e) {
        console.log(e);
        res.status(e.code || 400).send({ message: e.message });
    }
});
//# sourceMappingURL=auth.common.js.map