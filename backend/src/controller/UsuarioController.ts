import { Request, Response } from "express-serve-static-core";
import { UsuarioBusiness } from "../business/UsuarioBusiness";
import { usuarioBaseDeDados } from "../data/UsuarioBaseDeDados";
import { UsuarioEntrada } from "../models/Usuario";

export class UsuarioController {
    public async Cadastro(req: Request, res: Response) {
        try {
            const input: UsuarioEntrada = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
                tipo: req.body.tipo
            }

            const usuarioBusiness: UsuarioBusiness = new UsuarioBusiness()
            const token: string = await usuarioBusiness.Cadastro(input)
        
            res.status(200).send({
                token: token,
                mensagem: "Usuário cadastrado com sucesso!"
            })

        } catch (error) {
            
            res.status(400).send(error.message || error.sqlMessage)

        }
    }
}