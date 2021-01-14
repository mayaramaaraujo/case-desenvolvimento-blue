import {v4} from 'uuid'

export class GeradorDeId {

    gerar():string {
        return v4()
    }
}

export const geradorDeId = new GeradorDeId()