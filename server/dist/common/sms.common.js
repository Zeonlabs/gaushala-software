"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sms_config_json_1 = require("./sms.config.json");
const request_1 = __importDefault(require("request"));
exports.sendSms = (phone, smsContent, smsContentType = 'english') => {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'POST',
            url: sms_config_json_1.URL,
            qs: {
                AUTH_KEY: sms_config_json_1.AUTH_KEY
            },
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
            body: {
                smsContent,
                // groupId: '0',
                routeId: sms_config_json_1.TRANS_DND_ROUTE,
                mobileNumbers: phone,
                senderId: sms_config_json_1.senderId,
                signature: sms_config_json_1.signature,
                smsContentType
            },
            json: true
        };
        request_1.default(options, function (error, response, body) {
            if (error)
                return reject(error);
            resolve(body);
        });
    });
};
//# sourceMappingURL=sms.common.js.map