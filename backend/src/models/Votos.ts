export class Voto {
    constructor(
        private id: string,
        private usuario_votante: string,
        private imovel_votado: string
    ) {
       this.id = id,
       this.usuario_votante = usuario_votante,
       this.imovel_votado = imovel_votado
    }

    public pegarId(): string { return this.id }
    public pegarUsuarioVotante(): string { return this.usuario_votante}
    public pegarImovelVotado(): string { return this.imovel_votado }

    public static VotosParaModelo = (voto: any) => {
        return new Voto(voto.id, voto.usuario_votante, voto.imovel_votado)
    }
}

export interface VotoUsuario {
    token: string,
    imovel_votado: string
}