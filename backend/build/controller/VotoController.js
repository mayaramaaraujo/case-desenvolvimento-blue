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
exports.VotoController = void 0;
const VotosBusiness_1 = require("../business/VotosBusiness");
const UsuarioBaseDeDados_1 = require("../data/UsuarioBaseDeDados");
const VotosBaseDeDados_1 = require("../data/VotosBaseDeDados");
const Autenticador_1 = require("../services/Autenticador");
const GeradorDeId_1 = require("../services/GeradorDeId");
class VotoController {
    Votar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    imovel_votado: req.params.id
                };
                const votoBusiness = new VotosBusiness_1.VotosBusiness(GeradorDeId_1.geradorDeId, VotosBaseDeDados_1.votosBaseDeDados, Autenticador_1.autenticador, UsuarioBaseDeDados_1.usuarioBaseDeDados);
                yield votoBusiness.Votar(input);
                res.status(200).send({
                    message: "Voto realizado com sucesso!"
                });
            }
            catch (erro) {
                res.status(400).send(erro.message || erro.sqlMessage);
            }
        });
    }
    PegarTodosOsVotos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                };
                const votoBusiness = new VotosBusiness_1.VotosBusiness(GeradorDeId_1.geradorDeId, VotosBaseDeDados_1.votosBaseDeDados, Autenticador_1.autenticador, UsuarioBaseDeDados_1.usuarioBaseDeDados);
                const resultado = yield votoBusiness.PegarTodosOsVotos(input.token);
                res.status(200).send(resultado);
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
    PegarVotosPorImovel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    imovel_id: req.params.id
                };
                const votoBusiness = new VotosBusiness_1.VotosBusiness(GeradorDeId_1.geradorDeId, VotosBaseDeDados_1.votosBaseDeDados, Autenticador_1.autenticador, UsuarioBaseDeDados_1.usuarioBaseDeDados);
                const resultado = yield votoBusiness.PegarVotosPorImovel(input.token, input.imovel_id);
                res.status(200).send(resultado);
            }
            catch (erro) {
                res.status(400).send(erro.message || erro.sqlMessage);
            }
        });
    }
}
exports.VotoController = VotoController;
