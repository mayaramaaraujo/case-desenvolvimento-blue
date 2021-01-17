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
exports.usuarioBusiness = exports.UsuarioBusiness = void 0;
const UsuarioBaseDeDados_1 = require("../data/UsuarioBaseDeDados");
const Usuario_1 = require("../models/Usuario");
const Autenticador_1 = require("../services/Autenticador");
const GeradorDeHash_1 = require("../services/GeradorDeHash");
const GeradorDeId_1 = require("../services/GeradorDeId");
class UsuarioBusiness {
    constructor(geradorDeId, geradorDeHash, usuarioBaseDeDados, autenticador) {
        this.geradorDeId = geradorDeId;
        this.geradorDeHash = geradorDeHash;
        this.usuarioBaseDeDados = usuarioBaseDeDados;
        this.autenticador = autenticador;
    }
    Cadastro(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(input.nome, input.senha, input.email);
                if (!input.nome || !input.email || !input.senha) {
                    throw new Error("Preencha todos os campos");
                }
                if (input.senha.length < 6) {
                    throw new Error("A senha deve ser maior que seis.");
                }
                const id = this.geradorDeId.gerar();
                const senhaHash = yield this.geradorDeHash.hash(input.senha);
                const novoUsuario = Usuario_1.Usuario.UsuarioParaModelo({
                    id: id,
                    nome: input.nome,
                    email: input.email,
                    senha: senhaHash,
                    tipo: input.tipo
                });
                yield this.usuarioBaseDeDados.Cadastro(novoUsuario);
                const token = this.autenticador.gerarToken({ id: id });
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
                const resultado = yield this.usuarioBaseDeDados.PegarUsuarioPeloEmail(input.email);
                if (!resultado) {
                    throw new Error("Usuário não cadastrado.");
                }
                const SenhaEstaCorreta = yield this.geradorDeHash.compare(input.senha, resultado.senha);
                if (!SenhaEstaCorreta) {
                    throw new Error("Senha inválida");
                }
                const token = this.autenticador.gerarToken({ id: resultado.id });
                return token;
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
    PegarTodosOsUsuarios(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IdUsuario = this.autenticador.pegarDado(token);
                const usuario = yield this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id);
                if (usuario.tipo.toUpperCase() !== "ADMIN") {
                    throw new Error("Usuário não autorizado. Somente administradores tem acesso a esses dados.");
                }
                const resultado = this.usuarioBaseDeDados.PegarTodosOsUsuarios();
                return resultado;
            }
            catch (erro) {
                throw new Error(erro.message || erro.sqlMessage);
            }
        });
    }
}
exports.UsuarioBusiness = UsuarioBusiness;
exports.usuarioBusiness = new UsuarioBusiness(GeradorDeId_1.geradorDeId, GeradorDeHash_1.geradorDeHash, UsuarioBaseDeDados_1.usuarioBaseDeDados, Autenticador_1.autenticador);
