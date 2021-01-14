import { Request, Response } from "express-serve-static-core";
import { ImovelBusiness } from "../business/ImovelBusiness";
import { ImovelCadastro, ImovelEntrada } from "../models/Imovel";

export class ImovelController {
    public async CadastrarImovel(req: Request, res: Response) {
        try {
            const input: ImovelCadastro = {
                token: req.headers.authorization as string,
                nome: req.body.nome
            }

            const imovelBusiness: ImovelBusiness = new ImovelBusiness()
            await imovelBusiness.CadastrarImovel({token: input.token, nome: input.nome})

            res.status(200).send({
                message: "Imóvel cadastrado com sucesso!"
            })
        } catch (erro) {
            res.status(400).send(erro.message || erro.sqlMessage)
        }
    }

    public async DeletarImovel(req: Request, res: Response) {
        try {
            const input: any = {
                token: req.headers.authorization as string,
                id: req.params.id
            }

            const imovelBusiness: ImovelBusiness = new ImovelBusiness()
            await imovelBusiness.DeletarImovel(input.id, input.token)

            res.status(200).send({
                message: "Imóvel deletado com sucesso!"
            })
            
        } catch (erro) {
            res.status(400).send(erro.message || erro.sqlMessage)
        }
    }
}