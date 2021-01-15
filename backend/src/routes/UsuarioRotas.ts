import express from 'express'
import { UsuarioController } from '../controller/UsuarioController';

export const usuarioRotas = express.Router();

const usuarioController = new UsuarioController()

usuarioRotas.post("/cadastro", usuarioController.Cadastro)
usuarioRotas.post("/entrar", usuarioController.Entrar)
usuarioRotas.get("/todos", usuarioController.PegarTodosOsUsuarios) // autenticado adm