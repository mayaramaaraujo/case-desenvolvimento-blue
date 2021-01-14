import { usuarioBaseDeDados} from "../data/UsuarioBaseDeDados"
import { Usuario, UsuarioEntrada, StringParaTipo, TipoUsuario } from "../models/Usuario"
import { Autenticador } from "../services/Autenticador"
import { geradorDeHash } from "../services/GeradorDeHash"
import { geradorDeId } from "../services/GeradorDeId"


export class UsuarioBusiness {
    public async Cadastro(input: UsuarioEntrada): Promise<any> {
        try {
            if(!input.nome || !input.email || !input.senha || !input.tipo) {
                throw new Error("Preencha todos os campos")
            }
            
            const tipo: TipoUsuario = StringParaTipo(input.tipo.toUpperCase())

            if(input.senha.length < 6){
                throw new Error("A senha deve ser maior que seis.")
            }

            const id: string = geradorDeId.gerar()

            const senhaHash: string = await geradorDeHash.hash(input.senha)

            const novoUsuario: Usuario = Usuario.UsuarioParaModelo({
                id: id, 
                nome: input.nome,
                email: input.email, 
                senha: senhaHash,
                tipo: tipo 
            })

            await usuarioBaseDeDados.Cadastro(novoUsuario)

            const autenticador: Autenticador = new Autenticador()
            const token: string = autenticador.gerarToken({id: id})

            return token
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

}