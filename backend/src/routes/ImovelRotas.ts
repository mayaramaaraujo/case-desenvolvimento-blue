import express from 'express'
import { ImovelController } from '../controller/ImovelController';

export const imovelRotas = express.Router();

const imovelController = new ImovelController()

imovelRotas.post("/cadastro", imovelController.CadastrarImovel) //autenticado adm
imovelRotas.delete("/:id", imovelController.DeletarImovel)  //autenticado adm