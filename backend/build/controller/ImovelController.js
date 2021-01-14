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
class ImovelController {
    CadastrarImovel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.token,
                    nome: req.body.nome
                };
                const imovelBusiness = new ImovelBusiness_1.ImovelBusiness();
                yield imovelBusiness.CadastrarImovel({ token: input.token, nome: input.nome });
                res.status(200).send({
                    message: "Imóvel cadastrado com sucesso!"
                });
            }
            catch (erro) {
                res.status(400).send(erro.message || erro.sqlMessage);
            }
        });
    }
}
exports.ImovelController = ImovelController;
//# sourceMappingURL=ImovelController.js.map