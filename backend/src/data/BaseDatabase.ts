import dotenv from "dotenv"
import knex from 'knex'
import Knex from 'knex'

dotenv.config()

export default class BaseDatabase {
    protected static connection: Knex = knex({
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: process.env.DB_PASSWORD,
            database: "case-blue"
        }
    })

    public static async destroyConnection(): Promise<void> {
        await BaseDatabase.connection.destroy()
    }
}