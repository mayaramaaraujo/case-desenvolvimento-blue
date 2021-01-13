export class Usuario{
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private senha: string,
        private tipo: TipoUsuario
    ) {
        this.id = id,
        this.nome = nome,
        this.email = email,
        this.senha = senha,
        this.tipo = tipo
    }

    public pegarId(): string {
        return this.id
    }

    public pegarNome(): string {
        return this.nome
    }

    public pegarEmail(): string {
        return this.email
    }

    public pegarSenha(): string {
        return this.senha
    }

    public pegarTipo(): string {
        return this.tipo
    }

}

export const stringParaTipo = (entrada: string): TipoUsuario => {
    switch(entrada) {
        case "NORMAL":
            return TipoUsuario.NORMAL;
        case "ADMIN": 
            return TipoUsuario.ADMIN;
        default:
            throw new Error("Tipo inválido.")
    }
}

export enum TipoUsuario {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}