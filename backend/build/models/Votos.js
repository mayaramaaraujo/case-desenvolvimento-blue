"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voto = void 0;
class Voto {
    constructor(id, usuario_votante, imovel_votado) {
        this.id = id;
        this.usuario_votante = usuario_votante;
        this.imovel_votado = imovel_votado;
        this.id = id,
            this.usuario_votante = usuario_votante,
            this.imovel_votado = imovel_votado;
    }
    pegarId() { return this.id; }
    pegarUsuarioVotante() { return this.usuario_votante; }
    pegarImovelVotado() { return this.imovel_votado; }
}
exports.Voto = Voto;
Voto.VotosParaModelo = (voto) => {
    return new Voto(voto.id, voto.usuario_votante, voto.imovel_votado);
};
