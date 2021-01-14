import { ImoveisBaseDeDados } from "../data/ImoveisBaseDeDados";
import { usuarioBaseDeDados } from "../data/UsuarioBaseDeDados";
import { Imovel, ImovelCadastro } from "../models/Imovel";
import { UsuarioSaida } from "../models/Usuario";
import { autenticador, DadoAutenticacao } from "../services/Autenticador";
import { geradorDeId } from "../services/GeradorDeId";

export class ImovelBusiness {
    public async CadastrarImovel(input: ImovelCadastro) {
        try {
            if(!input.token){
                throw new Error("Usuário não autenticado.")
            }

            if(!input.nome){
                throw new Error("Insira um nome para o imóvel.")
            }

            const IdUsuario: DadoAutenticacao = autenticador.pegarDado(input.token)

            const usuario: UsuarioSaida = await usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores podem cadastrar imóveis.")
            }

            const id: string = geradorDeId.gerar()

            const novoImovel: Imovel = Imovel.ImovelParaModelo({id: id, nome: input.nome})

            const imovelBaseDeDados: ImoveisBaseDeDados = new ImoveisBaseDeDados()
            await imovelBaseDeDados.CadastrarImovel(novoImovel)  
            
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async DeletarImovel(id: string, token: string){
        try {
            if(!id || !token){
                throw new Error("É necessário colocar o id e o token para deletar um imóvel.")
            }

            const IdUsuario: DadoAutenticacao = autenticador.pegarDado(token)

            const usuario: UsuarioSaida = await usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores podem cadastrar imóveis.")
            }

            const imovelBaseDeDados: ImoveisBaseDeDados = new ImoveisBaseDeDados()
            await imovelBaseDeDados.DeletarImovel(id)

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }
}