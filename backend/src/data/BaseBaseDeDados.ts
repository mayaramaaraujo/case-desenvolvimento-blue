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
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }
    })

    static connection: any

    public static async destroyConnection(): Promise<void> {
        await BaseBaseDeDados.connection.destroy()
    }
}