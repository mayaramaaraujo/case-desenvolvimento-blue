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
}