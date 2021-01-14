import { Voto } from "../models/Votos";
import BaseBaseDeDados from "./BaseBaseDeDados";

export class VotosBaseDeDados extends BaseBaseDeDados {
    public async Votar(input: Voto){
        try {
            await this.connection()
            .insert({
                id: input.pegarId(),
                usuario_votante: input.pegarUsuarioVotante(),
                imovel_votado: input.pegarImovelVotado()
            })
            .into(this.NomesTabelas.votos)
        } catch (erro) {
            if(erro.sqlMessage.includes("Duplicate entry")){
                throw new Error("Usuário já votou.")
            }

            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarTodosOsVotos() {
        try {
            const resultado = await this.connection
            .select("*")
            .from("votos")
            
            return resultado
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async pegarVotosPorImovel(imovel_id: string) {
        try {
            const resultado = await this.connection
            .select("*")
            .from("votos")
            .where("imovel_votado", imovel_id)

            return resultado
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

}