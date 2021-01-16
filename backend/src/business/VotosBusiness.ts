import { UsuarioBaseDeDados, usuarioBaseDeDados } from "../data/UsuarioBaseDeDados";
import { votosBaseDeDados, VotosBaseDeDados } from "../data/VotosBaseDeDados";
import { UsuarioSaida } from "../models/Usuario";
import { Voto, VotoUsuario } from "../models/Votos";
import { Autenticador, autenticador, DadoAutenticacao } from "../services/Autenticador";
import { GeradorDeId, geradorDeId } from "../services/GeradorDeId";

export class VotosBusiness {
    constructor(
        private geradorDeId: GeradorDeId,
        private votosBaseDeDados: VotosBaseDeDados,
        private autenticador: Autenticador,
        private usuarioBaseDeDados: UsuarioBaseDeDados
    ){ }

    public async Votar(input: VotoUsuario){
        try {
            if(!input.imovel_votado){
                throw new Error("Nenhum imóvel foi escolhido para voto.")
            }

            if(!input.token){
                throw new Error("Usuário não autenticado.")
            }

            const idVoto: string = this.geradorDeId.gerar()

            const IdUsuarioLogado: DadoAutenticacao = this.autenticador.pegarDado(input.token)
            const usuario: UsuarioSaida = await this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuarioLogado.id)

            const novoVoto: Voto = Voto.VotosParaModelo({
                id: idVoto,
                usuario_votante: usuario.id,
                imovel_votado: input.imovel_votado
            })

            await this.votosBaseDeDados.Votar(novoVoto)

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarTodosOsVotos(token: string) {
        try {
            const IdUsuario: DadoAutenticacao = this.autenticador.pegarDado(token)

            const usuario: UsuarioSaida = await this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores podem ver todos os votos.")
            }

            const votos = await this.votosBaseDeDados.PegarTodosOsVotos()

            return votos
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarVotosPorImovel(token: string, imovel_id: string){
        try {
            const IdUsuario: DadoAutenticacao = this.autenticador.pegarDado(token)

            const usuario: UsuarioSaida = await this.usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores podem ver todos os votos.")
            }

            if(!imovel_id){
                throw new Error("Nenhum imóvel para buscar.")
            }

            const resultado = await this.votosBaseDeDados.pegarVotosPorImovel(imovel_id)

            return resultado

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }
}

export default new VotosBusiness(
    geradorDeId,
    votosBaseDeDados,
    autenticador,
    usuarioBaseDeDados
)