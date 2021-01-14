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
                const usuarioBusiness = new UsuarioBusiness_1.UsuarioBusiness();
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
                const usuarioBusiness = new UsuarioBusiness_1.UsuarioBusiness();
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
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=UsuarioController.js.map