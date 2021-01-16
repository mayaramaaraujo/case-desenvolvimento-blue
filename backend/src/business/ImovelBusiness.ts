import { ImoveisBaseDeDados, imovelBaseDeDados } from "../data/ImoveisBaseDeDados";
import { UsuarioBaseDeDados, usuarioBaseDeDados } from "../data/UsuarioBaseDeDados";
import { Imovel, ImovelCadastro } from "../models/Imovel";
import { UsuarioSaida } from "../models/Usuario";
import { Autenticador, autenticador, DadoAutenticacao } from "../services/Autenticador";
import { GeradorDeId, geradorDeId } from "../services/GeradorDeId";

export class ImovelBusiness {

    constructor(
        private geradorDeId: GeradorDeId,
        private autenticador: Autenticador,
        private usuarioBaseDeDados: UsuarioBaseDeDados,
        private imovelBaseDeDados: ImoveisBaseDeDados
    ) {}

    public async CadastrarImovel(input: ImovelCadastro) {
        try {
            if(!input.token){
                throw new Error("Usuário não autenticado.")
            }

            if(!input.nome){
                throw new Error("Insira um nome para o imóvel.")
            }

            const IdUsuario: DadoAutenticacao = this.autenticador.pegarDado(input.token)

            const usuario: UsuarioSaida = await this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores podem cadastrar imóveis.")
            }

            const id: string = this.geradorDeId.gerar()

            const novoImovel: Imovel = Imovel.ImovelParaModelo({id: id, nome: input.nome})

            await this.imovelBaseDeDados.CadastrarImovel(novoImovel)  
            
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async DeletarImovel(id: string, token: string){
        try {
            if(!id || !token){
                throw new Error("É necessário colocar o id e o token para deletar um imóvel.")
            }

            const IdUsuario: DadoAutenticacao = this.autenticador.pegarDado(token)

            const usuario: UsuarioSaida = await this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores podem cadastrar imóveis.")
            }

            await this.imovelBaseDeDados.DeletarImovel(id)

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }
}

export default new ImovelBusiness(
    geradorDeId,
    autenticador,
    usuarioBaseDeDados,
    imovelBaseDeDados
)