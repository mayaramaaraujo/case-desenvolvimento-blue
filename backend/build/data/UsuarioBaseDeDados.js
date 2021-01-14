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
exports.usuarioBaseDeDados = exports.UsuarioBaseDeDados = void 0;
const BaseBaseDeDados_1 = __importDefault(require("./BaseBaseDeDados"));
class UsuarioBaseDeDados extends BaseBaseDeDados_1.default {
    Cadastro(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection()
                    .insert({
                    id: usuario.pegarId(),
                    nome: usuario.pegarNome(),
                    email: usuario.pegarEmail(),
                    senha: usuario.pegarSenha(),
                    tipo: usuario.pegarTipo()
                })
                    .into(this.NomesTabelas.usuarios);
            }
            catch (erro) {
                if (erro.sqlMessage.includes("Duplicate entry")) {
                    throw new Error("Usuário já existe.");
                }
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    PegarUsuarioPeloEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield this.connection()
                    .select("*")
                    .from(this.NomesTabelas.usuarios)
                    .where("email", email);
                return resultado[0];
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    PegarUsuarioPeloId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield this.connection()
                    .select("*")
                    .from(this.NomesTabelas.usuarios)
                    .where("id", id);
                return resultado[0];
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
}
exports.UsuarioBaseDeDados = UsuarioBaseDeDados;
exports.usuarioBaseDeDados = new UsuarioBaseDeDados();
//# sourceMappingURL=UsuarioBaseDeDados.js.map