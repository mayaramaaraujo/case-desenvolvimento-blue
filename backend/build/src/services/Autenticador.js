"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticador = exports.Autenticador = void 0;
const jwt = __importStar(require("jsonwebtoken"));
class Autenticador {
    constructor() {
        this.expiraEm = process.env.EXPIRA_EM;
        this.jwt_chave = process.env.JWT_CHAVE;
    }
    gerarToken(input) {
        const token = jwt.sign({
            id: input.id
        }, this.jwt_chave, {
            expiresIn: this.expiraEm
        });
        return token;
    }
    pegarDado(token) {
        const payload = jwt.verify(token, this.jwt_chave);
        const result = {
            id: payload.id
        };
        return result;
    }
}
exports.Autenticador = Autenticador;
exports.autenticador = new Autenticador();
//# sourceMappingURL=Autenticador.js.map