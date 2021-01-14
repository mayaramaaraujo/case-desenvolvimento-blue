import express from 'express'
import { VotoController } from '../controller/VotoController';

export const votoRotas = express.Router();

const votoController: VotoController = new VotoController()

votoRotas.post("/:id", votoController.Votar)
votoRotas.get("/todos", votoController.PegarTodosOsVotos)
votoRotas.get("/imovel/:id", votoController.PegarVotosPorImovel)