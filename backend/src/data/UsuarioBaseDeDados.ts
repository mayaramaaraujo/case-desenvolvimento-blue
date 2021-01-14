import { Usuario } from "../models/Usuario";
import BaseBaseDeDados from "./BaseBaseDeDados";

export class UsuarioBaseDeDados extends BaseBaseDeDados {
    async Cadastro(usuario: Usuario){
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
        } catch (error) {
            if(error.sqlMessage.includes("Duplicate entry")){
                throw new Error("Usuário já existe.")
            }

            throw new Error(error.message || error.sqlMessage)
        }
    }
}

export const usuarioBaseDeDados: UsuarioBaseDeDados = new UsuarioBaseDeDados()