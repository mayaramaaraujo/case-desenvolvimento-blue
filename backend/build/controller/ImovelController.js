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
exports.ImovelController = void 0;
const ImovelBusiness_1 = require("../business/ImovelBusiness");
const ImoveisBaseDeDados_1 = require("../data/ImoveisBaseDeDados");
const UsuarioBaseDeDados_1 = require("../data/UsuarioBaseDeDados");
const Autenticador_1 = require("../services/Autenticador");
const GeradorDeId_1 = require("../services/GeradorDeId");
class ImovelController {
    CadastrarImovel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    nome: req.body.nome
                };
                const imovelBusiness = new ImovelBusiness_1.ImovelBusiness(GeradorDeId_1.geradorDeId, Autenticador_1.autenticador, UsuarioBaseDeDados_1.usuarioBaseDeDados, ImoveisBaseDeDados_1.imovelBaseDeDados);
                yield imovelBusiness.CadastrarImovel({ token: input.token, nome: input.nome });
                res.status(200).send({
                    message: "Imóvel cadastrado com sucesso!"
                });
            }
            catch (erro) {
                let mensagemErro = erro.message;
                if (erro.message.includes("jwt must be provided")) {
                    mensagemErro = "Usuário não autorizado. É necessário ter o token de acesso.";
                }
                res.status(400).send(mensagemErro || erro.sqlMessage);
            }
        });
    }
    DeletarImovel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    id: req.params.id
                };
                const imovelBusiness = new ImovelBusiness_1.ImovelBusiness(GeradorDeId_1.geradorDeId, Autenticador_1.autenticador, UsuarioBaseDeDados_1.usuarioBaseDeDados, ImoveisBaseDeDados_1.imovelBaseDeDados);
                yield imovelBusiness.DeletarImovel(input.id, input.token);
                res.status(200).send({
                    message: "Imóvel deletado com sucesso!"
                });
            }
            catch (erro) {
                let mensagemErro = erro.message;
                if (erro.message.includes("jwt must be provided")) {
                    mensagemErro = "Usuário não autorizado. É necessário ter o token de acesso.";
                }
                res.status(400).send(mensagemErro || erro.sqlMessage);
            }
        });
    }
}
exports.ImovelController = ImovelController;
