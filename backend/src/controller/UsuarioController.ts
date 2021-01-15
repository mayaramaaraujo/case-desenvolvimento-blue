import { Request, Response } from "express-serve-static-core";
import { UsuarioBusiness } from "../business/UsuarioBusiness";
import { UsuarioEntrada, UsuarioEntrar } from "../models/Usuario";

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

    public async Entrar(req: Request, res: Response) {
        try {
            const input: UsuarioEntrar = {
                email: req.body.email,
                senha: req.body.senha
            }

            const usuarioBusiness: UsuarioBusiness = new UsuarioBusiness()
            const token: string = await usuarioBusiness.Entrar(input)

            res.status(200).send({
                token: token,
                message: "Usuário logado com sucesso!"
            })
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage)
        }
    }

    public async PegarTodosOsUsuarios(req: Request, res: Response){
        try {
            const input = {
                token: req.headers.authorization as string
            }

            const usuarioBusiness: UsuarioBusiness = new UsuarioBusiness()
            const resultado = await usuarioBusiness.PegarTodosOsUsuarios(input.token)

            res.status(200).send(resultado)

        } catch (erro) {
            let mensagemErro = erro.message

            if(erro.message.includes("jwt must be provided")){
                mensagemErro = "Usuário não autorizado. É necessário ter o token de acesso."
            }

            res.status(400).send(mensagemErro || erro.sqlMessage)
        }
    }
}