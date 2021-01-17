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
exports.votosBaseDeDados = exports.VotosBaseDeDados = void 0;
const BaseBaseDeDados_1 = __importDefault(require("./BaseBaseDeDados"));
class VotosBaseDeDados extends BaseBaseDeDados_1.default {
    Votar(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connection()
                    .insert({
                    id: input.pegarId(),
                    usuario_votante: input.pegarUsuarioVotante(),
                    imovel_votado: input.pegarImovelVotado()
                })
                    .into(this.NomesTabelas.votos);
            }
            catch (erro) {
                if (erro.sqlMessage.includes("Duplicate entry")) {
                    throw new Error("Usuário já votou.");
                }
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    PegarTodosOsVotos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield this.connection
                    .select("*")
                    .from("votos");
                return resultado;
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    pegarVotosPorImovel(imovel_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield this.connection
                    .select("*")
                    .from("votos")
                    .where("imovel_votado", imovel_id);
                return resultado;
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
}
exports.VotosBaseDeDados = VotosBaseDeDados;
exports.votosBaseDeDados = new VotosBaseDeDados();
