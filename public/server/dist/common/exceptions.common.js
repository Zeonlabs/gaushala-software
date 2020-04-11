"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PinNotFoundException extends Error {
    constructor() {
        super(...arguments);
        this.code = 404;
        this.message = 'pin not found';
    }
}
exports.PinNotFoundException = PinNotFoundException;
class IdNotProvidedException extends Error {
    constructor() {
        super(...arguments);
        this.code = 422;
        this.message = 'Id not provided';
    }
}
exports.IdNotProvidedException = IdNotProvidedException;
class NoRecordWithIDException extends Error {
    constructor() {
        super(...arguments);
        this.code = 404;
        this.message = 'no record found with such id';
    }
}
exports.NoRecordWithIDException = NoRecordWithIDException;
class ImageUploadFailedException extends Error {
    constructor() {
        super(...arguments);
        this.code = 409;
        this.message = 'image upload failed';
    }
}
exports.ImageUploadFailedException = ImageUploadFailedException;
class DocsNotProvidedError extends Error {
    constructor() {
        super(...arguments);
        this.code = 422;
        this.message = 'employee document not provided';
    }
}
exports.DocsNotProvidedError = DocsNotProvidedError;
class WrongOtpException extends Error {
    constructor() {
        super(...arguments);
        this.code = 401;
        this.message = 'wrong otp';
    }
}
exports.WrongOtpException = WrongOtpException;
class RequiredInputNotProvidedException extends Error {
    constructor() {
        super(...arguments);
        this.code = 422;
        this.message = 'requied input not provided';
    }
}
exports.RequiredInputNotProvidedException = RequiredInputNotProvidedException;
class insufficientSmsBalanceException extends Error {
    constructor() {
        super(...arguments);
        this.code = 419;
        this.message = 'insufficient sms balance';
    }
}
exports.insufficientSmsBalanceException = insufficientSmsBalanceException;
class InvalidOtpException extends Error {
    constructor() {
        super(...arguments);
        this.code = 401;
        this.message = 'invalid otp';
    }
}
exports.InvalidOtpException = InvalidOtpException;
class InvalidOtpRequest extends Error {
    constructor() {
        super(...arguments);
        this.code = 406;
        this.message = 'invalid otp request - otp not available';
    }
}
exports.InvalidOtpRequest = InvalidOtpRequest;
//# sourceMappingURL=exceptions.common.js.map