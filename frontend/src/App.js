import { BrowserRouter } from "react-router-dom";
import Cabecalho from "./components/Cabeçalho/Cabecalho";
import Rotas from "./routes/Rotas";
import styled from 'styled-components';
import Rodape from "./components/Rodapé/Rodape"

const PaginaInteira = styled.div `
  width: 100%;
  height: 100vh;
`


function App() {
  return (
    <PaginaInteira>
      <BrowserRouter>
        <Cabecalho />
        <Rotas />
        <Rodape />
      </BrowserRouter>
    </PaginaInteira>
  );
}

export default App;
