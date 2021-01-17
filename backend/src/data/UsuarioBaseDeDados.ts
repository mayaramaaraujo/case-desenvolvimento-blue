import { Usuario, UsuarioSaida } from "../models/Usuario";
import BaseBaseDeDados from "./BaseBaseDeDados";

export class UsuarioBaseDeDados extends BaseBaseDeDados {
    public async Cadastro(usuario: Usuario){
        try {
            await this.connection()
            .insert({
                id: usuario.pegarId(),
                nome: usuario.pegarNome(),
                email: usuario.pegarEmail(),
                senha: usuario.pegarSenha(),
                tipo: usuario.pegarTipo()
            })
            .into(this.NomesTabelas.usuarios)
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarUsuarioPeloEmail(email: string): Promise<any> {
        try {
            const resultado = await this.connection()
            .select("*")
            .from(this.NomesTabelas.usuarios)
            .where("email", email)

            return resultado[0]

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarUsuarioPeloId(id: string): Promise<UsuarioSaida> {
        try {
            const resultado = await this.connection()
            .select("*")
            .from(this.NomesTabelas.usuarios)
            .where("id", id)

            return resultado[0]

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarTodosOsUsuarios() {
        try {
            const resultado = await this.connection()
            .select("*")
            .from(this.NomesTabelas.usuarios)

            return resultado
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

}

export const usuarioBaseDeDados: UsuarioBaseDeDados = new UsuarioBaseDeDados()