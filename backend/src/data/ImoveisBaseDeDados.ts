import { Imovel } from "../models/Imovel";
import BaseBaseDeDados from "./BaseBaseDeDados";

export class ImoveisBaseDeDados extends BaseBaseDeDados{
    public async CadastrarImovel(imovel: Imovel) {
        try {
            await this.connection()
            .insert({
                id: imovel.pegarId(),
                nome: imovel.pegarNome()
            })
            .into(this.NomesTabelas.imoveis)
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async DeletarImovel(id: string){
        try {
            await this.connection("imoveis")
            .where("id", id)
            .del()

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }
}

export const imovelBaseDeDados: ImoveisBaseDeDados = new ImoveisBaseDeDados()