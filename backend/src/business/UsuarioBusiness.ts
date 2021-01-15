import { usuarioBaseDeDados} from "../data/UsuarioBaseDeDados"
import { Usuario, UsuarioEntrada, StringParaTipo, TipoUsuario, UsuarioEntrar, UsuarioSaida } from "../models/Usuario"
import { autenticador, Autenticador, DadoAutenticacao } from "../services/Autenticador"
import { geradorDeHash } from "../services/GeradorDeHash"
import { geradorDeId } from "../services/GeradorDeId"


export class UsuarioBusiness {
    public async Cadastro(input: UsuarioEntrada): Promise<any> {
        try {
            if(!input.nome || !input.email || !input.senha) {
                throw new Error("Preencha todos os campos")
            }

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
                tipo: input.tipo
            });

            await usuarioBaseDeDados.Cadastro(novoUsuario)

            const autenticador: Autenticador = new Autenticador()
            const token: string = autenticador.gerarToken({id: id})

            return token
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async Entrar(input: UsuarioEntrar): Promise<string> {
        try {
            if(!input.email || !input.senha){
                throw new Error("O campo email e senha são obrigatórios.")
            }

            const resultado: UsuarioSaida = await usuarioBaseDeDados.PegarUsuarioPeloEmail(input.email)

            if(!resultado) {
                throw new Error("Usuário não cadastrado.")
            }

            const SenhaEstaCorreta: boolean = await geradorDeHash.compare(input.senha,resultado.senha)

            if(!SenhaEstaCorreta) {
                throw new Error("Senha inválida")
            }

            const autenticador: Autenticador = new Autenticador()
            const token: string = autenticador.gerarToken({id: resultado.id})

            return token

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarTodosOsUsuarios(token: string){
        try {
            const IdUsuario: DadoAutenticacao = autenticador.pegarDado(token)

            const usuario: UsuarioSaida = await usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores tem acesso a esses dados.")
            }

            const resultado = usuarioBaseDeDados.PegarTodosOsUsuarios()

            return resultado
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

}