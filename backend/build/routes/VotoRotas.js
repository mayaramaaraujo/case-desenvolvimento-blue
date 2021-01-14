"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.votoRotas = void 0;
const express_1 = __importDefault(require("express"));
const VotoController_1 = require("../controller/VotoController");
exports.votoRotas = express_1.default.Router();
const votoController = new VotoController_1.VotoController();
exports.votoRotas.post("/:id", votoController.Votar);
exports.votoRotas.get("/todos", votoController.PegarTodosOsVotos);
exports.votoRotas.get("/imovel/:id", votoController.PegarVotosPorImovel);
//# sourceMappingURL=VotoRotas.js.map