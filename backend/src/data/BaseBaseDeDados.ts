import dotenv from "dotenv"
import Knex from 'knex'

dotenv.config()

export default class BaseBaseDeDados {
    protected NomesTabelas = {
        usuarios: "usuarios",
        imoveis: "imoveis",
        votos: "votos"
    }

    protected connection: Knex = Knex({
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "password",
            database: "case_blue"
        }
    })
    static connection: any

    public static async destroyConnection(): Promise<void> {
        await BaseBaseDeDados.connection.destroy()
    }
}