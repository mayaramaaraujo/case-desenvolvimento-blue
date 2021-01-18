import Entrar from "../screens/Entrar/Entrar";
import Votar from "../screens/Votar/Votar";
import Cadastro from "../screens/Cadastro/Cadastro";
import Administrador from "../screens/Administrador/Admistrador";
import Inicio from "../screens/Inicio/Inicio"
import { Route, Switch } from 'react-router-dom';


function Rotas(){
    return (
            <Switch>
                <Route exact path="/">
                    <Inicio />
                </Route>

                <Route exact path="/votar">
                    <Votar />
                </Route>

                <Route exact path="/entrar">
                    <Entrar />
                </Route>

                <Route exact path="/cadastro">
                    <Cadastro />
                </Route>

                <Route exact path="/admin">
                    <Administrador />
                </Route>

                <Route>
                    <p>404 - Página não encontrada! :(</p>
                </Route>
            </Switch>
    )
}

export default Rotas;