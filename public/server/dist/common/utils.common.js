"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseNum = (num) => parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num);
exports.getStatusCode = (code) => (code >= 100 && code < 600) ? code : 500;
exports.alterAnimalsArray = (animals) => animals.map(ani => ({ type: ani.type, count: -ani.count }));
exports.countTotalAnimal = (animals) => {
    let total = 0;
    animals.forEach(animal => total += animal.count);
    return total;
};
exports.genOtp = () => Math.floor(1000 + Math.random() * 9000);
//# sourceMappingURL=utils.common.js.map