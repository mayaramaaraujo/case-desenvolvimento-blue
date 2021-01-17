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
exports.UsuarioController = void 0;
const UsuarioBusiness_1 = require("../business/UsuarioBusiness");
const UsuarioBaseDeDados_1 = require("../data/UsuarioBaseDeDados");
const Autenticador_1 = require("../services/Autenticador");
const GeradorDeHash_1 = require("../services/GeradorDeHash");
const GeradorDeId_1 = require("../services/GeradorDeId");
class UsuarioController {
    Cadastro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    tipo: req.body.tipo
                };
                const usuarioBusiness = new UsuarioBusiness_1.UsuarioBusiness(GeradorDeId_1.geradorDeId, GeradorDeHash_1.geradorDeHash, UsuarioBaseDeDados_1.usuarioBaseDeDados, Autenticador_1.autenticador);
                const token = yield usuarioBusiness.Cadastro(input);
                res.status(200).send({
                    token: token,
                    mensagem: "Usuário cadastrado com sucesso!"
                });
            }
            catch (error) {
                res.status(400).send(error.message || error.sqlMessage);
            }
        });
    }
    Entrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    email: req.body.email,
                    senha: req.body.senha
                };
                const usuarioBusiness = new UsuarioBusiness_1.UsuarioBusiness(GeradorDeId_1.geradorDeId, GeradorDeHash_1.geradorDeHash, UsuarioBaseDeDados_1.usuarioBaseDeDados, Autenticador_1.autenticador);
                const token = yield usuarioBusiness.Entrar(input);
                res.status(200).send({
                    token: token,
                    message: "Usuário logado com sucesso!"
                });
            }
            catch (error) {
                res.status(400).send(error.message || error.sqlMessage);
            }
        });
    }
    PegarTodosOsUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization
                };
                const usuarioBusiness = new UsuarioBusiness_1.UsuarioBusiness(GeradorDeId_1.geradorDeId, GeradorDeHash_1.geradorDeHash, UsuarioBaseDeDados_1.usuarioBaseDeDados, Autenticador_1.autenticador);
                const resultado = yield usuarioBusiness.PegarTodosOsUsuarios(input.token);
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
}
exports.UsuarioController = UsuarioController;
