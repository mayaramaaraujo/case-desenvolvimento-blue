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
exports.UsuarioBusiness = void 0;
const UsuarioBaseDeDados_1 = require("../data/UsuarioBaseDeDados");
const Usuario_1 = require("../models/Usuario");
const Autenticador_1 = require("../services/Autenticador");
const GeradorDeHash_1 = require("../services/GeradorDeHash");
const GeradorDeId_1 = require("../services/GeradorDeId");
class UsuarioBusiness {
    Cadastro(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.nome || !input.email || !input.senha || !input.tipo) {
                    throw new Error("Preencha todos os campos");
                }
                const tipo = Usuario_1.StringParaTipo(input.tipo.toUpperCase());
                if (input.senha.length < 6) {
                    throw new Error("A senha deve ser maior que seis.");
                }
                const id = GeradorDeId_1.geradorDeId.gerar();
                const senhaHash = yield GeradorDeHash_1.geradorDeHash.hash(input.senha);
                const novoUsuario = Usuario_1.Usuario.UsuarioParaModelo({
                    id: id,
                    nome: input.nome,
                    email: input.email,
                    senha: senhaHash,
                    tipo: tipo
                });
                yield UsuarioBaseDeDados_1.usuarioBaseDeDados.Cadastro(novoUsuario);
                const autenticador = new Autenticador_1.Autenticador();
                const token = autenticador.gerarToken({ id: id });
                return token;
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    Entrar(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.email || !input.senha) {
                    throw new Error("O campo email e senha são obrigatórios.");
                }
                const resultado = yield UsuarioBaseDeDados_1.usuarioBaseDeDados.PegarUsuarioPeloEmail(input.email);
                if (!resultado) {
                    throw new Error("Usuário não cadastrado.");
                }
                console.log(resultado);
                const SenhaEstaCorreta = yield GeradorDeHash_1.geradorDeHash.compare(input.senha, resultado.senha);
                if (!SenhaEstaCorreta) {
                    throw new Error("Senha inválida");
                }
                console.log(SenhaEstaCorreta);
                const autenticador = new Autenticador_1.Autenticador();
                const token = autenticador.gerarToken({ id: resultado.id });
                return token;
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
}
exports.UsuarioBusiness = UsuarioBusiness;
//# sourceMappingURL=UsuarioBusiness.js.map