"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoUsuario = exports.StringParaTipo = exports.Usuario = void 0;
class Usuario {
    constructor(id, nome, email, senha, tipo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.id = id,
            this.nome = nome,
            this.email = email,
            this.senha = senha,
            this.tipo = tipo;
    }
    pegarId() {
        return this.id;
    }
    pegarNome() {
        return this.nome;
    }
    pegarEmail() {
        return this.email;
    }
    pegarSenha() {
        return this.senha;
    }
    pegarTipo() {
        return this.tipo;
    }
}
exports.Usuario = Usuario;
Usuario.UsuarioParaModelo = (usuario) => {
    return new Usuario(usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.tipo);
};
exports.StringParaTipo = (entrada) => {
    switch (entrada) {
        case "NORMAL":
            return TipoUsuario.NORMAL;
        case "ADMIN":
            return TipoUsuario.ADMIN;
        default:
            throw new Error("Tipo inválido.");
    }
};
var TipoUsuario;
(function (TipoUsuario) {
    TipoUsuario["NORMAL"] = "NORMAL";
    TipoUsuario["ADMIN"] = "ADMIN";
})(TipoUsuario = exports.TipoUsuario || (exports.TipoUsuario = {}));
//# sourceMappingURL=Usuario.js.map