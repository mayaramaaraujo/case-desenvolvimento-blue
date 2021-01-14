"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imovelRotas = void 0;
const express_1 = __importDefault(require("express"));
const ImovelController_1 = require("../controller/ImovelController");
exports.imovelRotas = express_1.default.Router();
const imovelController = new ImovelController_1.ImovelController();
exports.imovelRotas.post("/cadastro", imovelController.CadastrarImovel);
//# sourceMappingURL=ImovelRotas.js.map