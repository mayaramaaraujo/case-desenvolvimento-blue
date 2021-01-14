import * as bcrypt from 'bcryptjs';

export class GeradorDeHash {
    rodadas: number = Number(process.env.BCRYPT_CUSTO)

    async hash(texto: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.rodadas)
        return await bcrypt.hash(texto, salt)
    }

    async compare(texto: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(texto, hash)
    }
}

export const geradorDeHash = new GeradorDeHash()