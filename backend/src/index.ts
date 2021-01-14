import express, {Express} from "express"
import cors from "cors"
import dotenv from "dotenv"
import { usuarioRotas } from "./routes/UsuarioRotas"

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(cors())

app.use("/usuario", usuarioRotas)

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})