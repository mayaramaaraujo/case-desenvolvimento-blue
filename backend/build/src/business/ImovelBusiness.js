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
exports.ImovelBusiness = void 0;
const ImoveisBaseDeDados_1 = require("../data/ImoveisBaseDeDados");
const UsuarioBaseDeDados_1 = require("../data/UsuarioBaseDeDados");
const Imovel_1 = require("../models/Imovel");
const Autenticador_1 = require("../services/Autenticador");
const GeradorDeId_1 = require("../services/GeradorDeId");
class ImovelBusiness {
    constructor(geradorDeId, autenticador, usuarioBaseDeDados, imovelBaseDeDados) {
        this.geradorDeId = geradorDeId;
        this.autenticador = autenticador;
        this.usuarioBaseDeDados = usuarioBaseDeDados;
        this.imovelBaseDeDados = imovelBaseDeDados;
    }
    CadastrarImovel(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new Error("Usuário não autenticado.");
                }
                if (!input.nome) {
                    throw new Error("Insira um nome para o imóvel.");
                }
                const IdUsuario = this.autenticador.pegarDado(input.token);
                const usuario = yield this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id);
                if (usuario.tipo.toUpperCase() !== "ADMIN") {
                    throw new Error("Usuário não autorizado. Somente administradores podem cadastrar imóveis.");
                }
                const id = this.geradorDeId.gerar();
                const novoImovel = Imovel_1.Imovel.ImovelParaModelo({ id: id, nome: input.nome });
                yield this.imovelBaseDeDados.CadastrarImovel(novoImovel);
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    DeletarImovel(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id || !token) {
                    throw new Error("É necessário colocar o id e o token para deletar um imóvel.");
                }
                const IdUsuario = this.autenticador.pegarDado(token);
                const usuario = yield this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id);
                if (usuario.tipo.toUpperCase() !== "ADMIN") {
                    throw new Error("Usuário não autorizado. Somente administradores podem cadastrar imóveis.");
                }
                yield this.imovelBaseDeDados.DeletarImovel(id);
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
}
exports.ImovelBusiness = ImovelBusiness;
exports.default = new ImovelBusiness(GeradorDeId_1.geradorDeId, Autenticador_1.autenticador, UsuarioBaseDeDados_1.usuarioBaseDeDados, ImoveisBaseDeDados_1.imovelBaseDeDados);
//# sourceMappingURL=ImovelBusiness.js.map