"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioRotas = void 0;
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("../controller/UsuarioController");
exports.usuarioRotas = express_1.default.Router();
const usuarioController = new UsuarioController_1.UsuarioController();
exports.usuarioRotas.post("/cadastro", usuarioController.Cadastro);
exports.usuarioRotas.post("/entrar", usuarioController.Entrar);
exports.usuarioRotas.get("/todos", usuarioController.PegarTodosOsUsuarios);
//# sourceMappingURL=UsuarioRotas.js.map