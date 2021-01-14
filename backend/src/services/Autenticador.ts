import * as jwt  from 'jsonwebtoken'

export class Autenticador {
    private expiraEm: string = process.env.EXPIRA_EM as string
    private jwt_chave: string = process.env.JWT_CHAVE as string

    public gerarToken(input: DadoAutenticacao){
        const token: string = jwt.sign({
            id: input.id
        },
            this.jwt_chave,
        {
            expiresIn: this.expiraEm
        }
    );

    return token;
    }

    public pegarDado(token: string): DadoAutenticacao {
        const payload = jwt.verify(token, this.jwt_chave as string) as any

        const result = {
            id: payload.id
        };

        return result
    }
}

interface DadoAutenticacao {
    id: string
}

export const autenticador: Autenticador = new Autenticador()