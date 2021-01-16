"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geradorDeId = exports.GeradorDeId = void 0;
const uuid_1 = require("uuid");
class GeradorDeId {
    gerar() {
        return uuid_1.v4();
    }
}
exports.GeradorDeId = GeradorDeId;
exports.geradorDeId = new GeradorDeId();
//# sourceMappingURL=GeradorDeId.js.map