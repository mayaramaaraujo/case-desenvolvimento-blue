import express from 'express'
import { UsuarioController } from '../controller/UsuarioController';

export const usuarioRotas = express.Router();

const usuarioController = new UsuarioController()

usuarioRotas.post("/cadastro", usuarioController.Cadastro)