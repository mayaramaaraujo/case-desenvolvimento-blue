import { UsuarioBaseDeDados, usuarioBaseDeDados} from "../data/UsuarioBaseDeDados"
import { Usuario, UsuarioEntrada, UsuarioEntrar, UsuarioSaida } from "../models/Usuario"
import { autenticador, Autenticador, DadoAutenticacao } from "../services/Autenticador"
import { GeradorDeHash, geradorDeHash } from "../services/GeradorDeHash"
import { GeradorDeId, geradorDeId } from "../services/GeradorDeId"


export class UsuarioBusiness {
    constructor(
        private geradorDeId: GeradorDeId,
        private geradorDeHash: GeradorDeHash,
        private usuarioBaseDeDados: UsuarioBaseDeDados,
        private autenticador: Autenticador
    ){}

    public async Cadastro(input: UsuarioEntrada): Promise<any> {
        try {
            if(!input.nome || !input.email || !input.senha) {
                throw new Error("Preencha todos os campos")
            }

            if(input.senha.length < 6){
                throw new Error("A senha deve ser maior que seis.")
            }

            const id: string = this.geradorDeId.gerar()

            const senhaHash: string = await this.geradorDeHash.hash(input.senha)

            const novoUsuario: Usuario = Usuario.UsuarioParaModelo({
                id: id, 
                nome: input.nome,
                email: input.email, 
                senha: senhaHash,
                tipo: input.tipo
            });

            await this.usuarioBaseDeDados.Cadastro(novoUsuario)

            const token: string = this.autenticador.gerarToken({id: id})

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

            const resultado: UsuarioSaida = await this.usuarioBaseDeDados.PegarUsuarioPeloEmail(input.email)

            if(!resultado) {
                throw new Error("Usuário não cadastrado.")
            }

            const SenhaEstaCorreta: boolean = await this.geradorDeHash.compare(input.senha,resultado.senha)

            if(!SenhaEstaCorreta) {
                throw new Error("Senha inválida")
            }

            const token: string = this.autenticador.gerarToken({id: resultado.id})

            return token

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarTodosOsUsuarios(token: string){
        try {
            const IdUsuario: DadoAutenticacao = this.autenticador.pegarDado(token)

            const usuario: UsuarioSaida = await this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores tem acesso a esses dados.")
            }

            const resultado = this.usuarioBaseDeDados.PegarTodosOsUsuarios()

            return resultado
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

}


export const usuarioBusiness: UsuarioBusiness = new UsuarioBusiness(
    geradorDeId,
    geradorDeHash,
    usuarioBaseDeDados,
    autenticador
)