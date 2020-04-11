"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const lodash_1 = __importDefault(require("lodash"));
const constants_common_1 = require("../../common/constants.common");
const commonAttr = {
    type: Number,
    default: 0
};
const variablesSchema = new mongoose_1.default.Schema({
    _id: {
        type: Number,
        default: constants_common_1.VAR_DOC_ID
    },
    name: String,
    phone: Number,
    pin: Number,
    stats: {
        capital: commonAttr,
        animal: {
            [constants_common_1.ANIMAL.gay]: commonAttr,
            [constants_common_1.ANIMAL.balad]: commonAttr,
            [constants_common_1.ANIMAL.vachrdi]: commonAttr,
            [constants_common_1.ANIMAL.vachrda]: commonAttr,
            [constants_common_1.ANIMAL.other]: commonAttr,
            big: commonAttr,
            small: commonAttr
        }
    },
    otp: Number,
    loggedIn: {
        type: Boolean,
        default: true
    }
});
variablesSchema.methods.toJSON = function () {
    return lodash_1.default.pick(this.toObject(), ['name', 'phone', 'stats', 'loggedIn']);
};
exports.Variables = mongoose_1.default.model('variables', variablesSchema);
//# sourceMappingURL=variables.schema.js.map