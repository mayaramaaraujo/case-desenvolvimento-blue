//import { Request, Response } from "express-serve-static-core";
import { Request, Response } from "express";
import { VotosBusiness } from "../business/VotosBusiness";
import { VotoUsuario } from "../models/Votos";

export class VotoController {
    public async Votar(req: Request, res: Response){
        try {
            const input: VotoUsuario = {
                token: req.headers.authorization as string,
                imovel_votado: req.params.id
            }

            const votoBusiness: VotosBusiness = new VotosBusiness()
            await votoBusiness.Votar(input)

            res.status(200).send({
                message: "Voto realizado com sucesso!"
            })
        } catch (erro) {
            res.status(400).send(erro.message || erro.sqlMessage)
        }
    }

    public async PegarTodosOsVotos(req: Request, res: Response){
        try {
            const input = {
                token: req.headers.authorization as string,
            }

            const votoBusiness: VotosBusiness = new VotosBusiness()
            const resultado = await votoBusiness.PegarTodosOsVotos(input.token)

            res.status(200).send(resultado)
        } catch (erro) {
            let mensagemErro = erro.message

            if(erro.message.includes("jwt must be provided")){
                mensagemErro = "Usuário não autorizado. É necessário ter o token de acesso."
            }

            res.status(400).send(mensagemErro || erro.sqlMessage)
        }
    }
    
    public async PegarVotosPorImovel(req: Request, res: Response){
        try {
            const input = {
                token: req.headers.authorization as string,
                imovel_id: req.params.id
            }

            const votoBusiness: VotosBusiness = new VotosBusiness()
            const resultado = await votoBusiness.PegarVotosPorImovel(input.token, input.imovel_id)

            res.status(200).send(resultado)
        } catch (erro) {
            res.status(400).send(erro.message || erro.sqlMessage)
        }
    }
}