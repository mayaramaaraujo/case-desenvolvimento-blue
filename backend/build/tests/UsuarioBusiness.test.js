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
const UsuarioBusiness_1 = require("../business/UsuarioBusiness");
const BaseBaseDeDados_1 = __importDefault(require("../data/BaseBaseDeDados"));
describe("Cadastro", () => {
    const geradorDeId = { gerar: jest.fn() };
    const geradorDeHash = {};
    const usuarioBaseDeDados = {};
    const autenticador = {};
    const usuarioBusiness = new UsuarioBusiness_1.UsuarioBusiness(geradorDeId, geradorDeHash, usuarioBaseDeDados, autenticador);
    test("Erro quando o nome estiver vazio", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield usuarioBusiness.Cadastro({
                nome: "",
                email: "mayara@gmail.com.br",
                senha: "123456"
            });
        }
        catch (erro) {
            expect(erro.message).toBe("Preencha todos os campos");
        }
    }));
    test("Erro quando o email estiver vazio", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield usuarioBusiness.Cadastro({
                nome: "Mayara",
                email: "",
                senha: "123456"
            });
        }
        catch (erro) {
            expect(erro.message).toBe("Preencha todos os campos");
        }
    }));
    test("Erro quando a senha estiver vazia", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield usuarioBusiness.Cadastro({
                nome: "Mayara",
                email: "mayara@gmail.com.br",
                senha: ""
            });
        }
        catch (erro) {
            expect(erro.message).toBe("Preencha todos os campos");
        }
    }));
    test("Erro quando a senha for menor que seis", () => __awaiter(void 0, void 0, void 0, function* () {
        expect.assertions(1);
        try {
            yield usuarioBusiness.Cadastro({
                nome: "Mayara",
                email: "mayara@gmail.com.br",
                senha: "12345"
            });
        }
        catch (erro) {
            expect(erro.message).toBe("A senha deve ser maior que seis.");
        }
    }));
});
describe("Integração cadastro", () => {
    test("Caso de sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const resultado = yield UsuarioBusiness_1.usuarioBusiness.Cadastro({
                nome: "Joana",
                email: "Joana@gmail.com.br",
                senha: "123456"
            });
            expect(resultado.token).toBeDefined();
        }
        catch (erro) {
        }
        expect.assertions(1);
        BaseBaseDeDados_1.default.destroyConnection();
    }));
});
