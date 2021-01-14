export class Imovel{
    constructor(
        private id: string,
        private nome: string
    ) {
        this.id = id,
        this.nome = nome
    }

    public pegarId(): string {
        return this.id
    }

    public pegarNome(): string {
        return this.nome
    }

    public static ImovelParaModelo = (imovel: any) => {
        return new Imovel(imovel.id , imovel.nome)
    }
}

export interface ImovelEntrada {
    id: string,
    nome: string
}

export interface ImovelCadastro {
    token: string
    nome: string
}