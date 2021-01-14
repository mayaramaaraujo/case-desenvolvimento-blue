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
exports.VotosBusiness = void 0;
const UsuarioBaseDeDados_1 = require("../data/UsuarioBaseDeDados");
const VotosBaseDeDados_1 = require("../data/VotosBaseDeDados");
const Votos_1 = require("../models/Votos");
const Autenticador_1 = require("../services/Autenticador");
const GeradorDeId_1 = require("../services/GeradorDeId");
class VotosBusiness {
    Votar(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.imovel_votado) {
                    throw new Error("Nenhum imóvel foi escolhido para voto.");
                }
                if (!input.token) {
                    throw new Error("Usuário não autenticado.");
                }
                const idVoto = GeradorDeId_1.geradorDeId.gerar();
                const IdUsuarioLogado = Autenticador_1.autenticador.pegarDado(input.token);
                const usuario = yield UsuarioBaseDeDados_1.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuarioLogado.id);
                const novoVoto = Votos_1.Voto.VotosParaModelo({
                    id: idVoto,
                    usuario_votante: usuario.id,
                    imovel_votado: input.imovel_votado
                });
                const votosBaseDeDados = new VotosBaseDeDados_1.VotosBaseDeDados();
                yield votosBaseDeDados.Votar(novoVoto);
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    PegarTodosOsVotos(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IdUsuario = Autenticador_1.autenticador.pegarDado(token);
                const usuario = yield UsuarioBaseDeDados_1.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id);
                if (usuario.tipo.toUpperCase() !== "ADMIN") {
                    throw new Error("Usuário não autorizado. Somente administradores podem ver todos os votos.");
                }
                const votosBaseDeDados = new VotosBaseDeDados_1.VotosBaseDeDados();
                const votos = yield votosBaseDeDados.PegarTodosOsVotos();
                console.log(votos);
                return votos;
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    PegarVotosPorImovel(token, imovel_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IdUsuario = Autenticador_1.autenticador.pegarDado(token);
                const usuario = yield UsuarioBaseDeDados_1.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id);
                if (usuario.tipo.toUpperCase() !== "ADMIN") {
                    throw new Error("Usuário não autorizado. Somente administradores podem ver todos os votos.");
                }
                if (!imovel_id) {
                    throw new Error("Nenhum imóvel para buscar.");
                }
                const votosBaseDeDados = new VotosBaseDeDados_1.VotosBaseDeDados();
                const resultado = yield votosBaseDeDados.pegarVotosPorImovel(imovel_id);
                return resultado;
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
}
exports.VotosBusiness = VotosBusiness;
//# sourceMappingURL=VotosBusiness.js.map