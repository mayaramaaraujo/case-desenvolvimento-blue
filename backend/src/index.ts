import express, {Express} from "express"
import cors from "cors"
import dotenv from "dotenv"
import { usuarioRotas } from "./routes/UsuarioRotas"
import { imovelRotas } from "./routes/ImovelRotas"
import { votoRotas } from "./routes/VotoRotas"

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/usuario", usuarioRotas)
app.use("/imovel", imovelRotas)
app.use("/votos", votoRotas)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})