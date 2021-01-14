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
    CadastrarImovel(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.token) {
                    throw new Error("Usuário não autenticado.");
                }
                if (!input.nome) {
                    throw new Error("Insira um nome para o imóvel.");
                }
                console.log(input);
                const IdUsuario = Autenticador_1.autenticador.pegarDado(input.token);
                const usuario = yield UsuarioBaseDeDados_1.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id);
                if (usuario.tipo !== "ADMIN") {
                    throw new Error("Usuário não autorizado. Somente administradores podem cadastrar imóveis.");
                }
                const id = GeradorDeId_1.geradorDeId.gerar();
                const novoImovel = Imovel_1.Imovel.ImovelParaModelo({ id: id, nome: input.nome });
                const imovelBaseDeDados = new ImoveisBaseDeDados_1.ImoveisBaseDeDados();
                yield imovelBaseDeDados.CadastrarImovel(novoImovel);
            }
            catch (erro) {
            }
        });
    }
}
exports.ImovelBusiness = ImovelBusiness;
//# sourceMappingURL=ImovelBusiness.js.map