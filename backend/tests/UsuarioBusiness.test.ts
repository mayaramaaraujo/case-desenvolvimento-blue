import { usuarioBusiness, UsuarioBusiness } from "../src/business/UsuarioBusiness"
import BaseBaseDeDados from "../src/data/BaseBaseDeDados"

describe("Cadastro", ()=> {
    const geradorDeId = {gerar: jest.fn()}
    const geradorDeHash =  {} 
    const usuarioBaseDeDados = {} 
    const autenticador = {} 

    const usuarioBusiness: UsuarioBusiness = new UsuarioBusiness(
        geradorDeId,
        geradorDeHash as any,
        usuarioBaseDeDados as any,
        autenticador as any
    )

    test("Erro quando o nome estiver vazio", async () => {
        expect.assertions(1)

        try {
            await usuarioBusiness.Cadastro({
                nome: "", 
                email: "mayara@gmail.com.br", 
                senha: "123456"
            })

        } catch (erro) {
            expect(erro.message).toBe("Preencha todos os campos")
        }
    })

    test("Erro quando o email estiver vazio", async () => {
        expect.assertions(1)

        try {
            await usuarioBusiness.Cadastro({
                nome: "Mayara", 
                email: "", 
                senha: "123456"
            })

        } catch (erro) {
            expect(erro.message).toBe("Preencha todos os campos")
        }
    })

    test("Erro quando a senha estiver vazia", async () => {
        expect.assertions(1)

        try {
            await usuarioBusiness.Cadastro({
                nome: "Mayara", 
                email: "mayara@gmail.com.br", 
                senha: ""
            })

        } catch (erro) {
            expect(erro.message).toBe("Preencha todos os campos")
        }
    })

    test("Erro quando a senha for menor que seis", async () => {
        expect.assertions(1)

        try {
            await usuarioBusiness.Cadastro({
                nome: "Mayara", 
                email: "mayara@gmail.com.br", 
                senha: "12345"
            })

        } catch (erro) {
            expect(erro.message).toBe("A senha deve ser maior que seis.")
        }
    })
    


})


describe("Integração cadastro", () => {

    test("Caso de sucesso", async () => {
            
        try {
            const resultado = await usuarioBusiness.Cadastro({
                nome: "Joana", 
                email: "Joana@gmail.com.br", 
                senha: "123456"
            })
            
            expect(resultado.token).toBeDefined()
            
        } catch (erro) {
            
        }

        expect.assertions(1)

        BaseBaseDeDados.destroyConnection()
    })

})
