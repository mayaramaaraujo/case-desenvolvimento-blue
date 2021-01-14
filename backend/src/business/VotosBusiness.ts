import { usuarioBaseDeDados } from "../data/UsuarioBaseDeDados";
import { VotosBaseDeDados } from "../data/VotosBaseDeDados";
import { UsuarioSaida } from "../models/Usuario";
import { Voto, VotoUsuario } from "../models/Votos";
import { autenticador, DadoAutenticacao } from "../services/Autenticador";
import { geradorDeId } from "../services/GeradorDeId";

export class VotosBusiness {
    public async Votar(input: VotoUsuario){
        try {
            if(!input.imovel_votado){
                throw new Error("Nenhum imóvel foi escolhido para voto.")
            }

            if(!input.token){
                throw new Error("Usuário não autenticado.")
            }

            const idVoto: string = geradorDeId.gerar()

            const IdUsuarioLogado: DadoAutenticacao = autenticador.pegarDado(input.token)
            const usuario: UsuarioSaida = await usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuarioLogado.id)

            const novoVoto: Voto = Voto.VotosParaModelo({
                id: idVoto,
                usuario_votante: usuario.id,
                imovel_votado: input.imovel_votado
            })

            const votosBaseDeDados: VotosBaseDeDados = new VotosBaseDeDados()
            await votosBaseDeDados.Votar(novoVoto)

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarTodosOsVotos(token: string) {
        try {
            const IdUsuario: DadoAutenticacao = autenticador.pegarDado(token)

            const usuario: UsuarioSaida = await usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores podem ver todos os votos.")
            }

            const votosBaseDeDados: VotosBaseDeDados = new VotosBaseDeDados()
            const votos = await votosBaseDeDados.PegarTodosOsVotos()
            console.log(votos)
            return votos
        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }

    public async PegarVotosPorImovel(token: string, imovel_id: string){
        try {
            const IdUsuario: DadoAutenticacao = autenticador.pegarDado(token)

            const usuario: UsuarioSaida = await usuarioBaseDeDados.PegarUsuarioPeloId(IdUsuario.id)

            if(usuario.tipo.toUpperCase() !== "ADMIN"){
                throw new Error("Usuário não autorizado. Somente administradores podem ver todos os votos.")
            }

            if(!imovel_id){
                throw new Error("Nenhum imóvel para buscar.")
            }

            const votosBaseDeDados: VotosBaseDeDados = new VotosBaseDeDados()
            const resultado = await votosBaseDeDados.pegarVotosPorImovel(imovel_id)

            return resultado

        } catch (erro) {
            throw new Error(erro.message || erro.sqlMessage)
        }
    }
}