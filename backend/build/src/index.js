"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UsuarioRotas_1 = require("./routes/UsuarioRotas");
const ImovelRotas_1 = require("./routes/ImovelRotas");
const VotoRotas_1 = require("./routes/VotoRotas");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/usuario", UsuarioRotas_1.usuarioRotas);
app.use("/imovel", ImovelRotas_1.imovelRotas);
app.use("/votos", VotoRotas_1.votoRotas);
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
//# sourceMappingURL=index.js.map