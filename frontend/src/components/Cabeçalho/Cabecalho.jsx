import { ThemeProvider, Typography } from '@material-ui/core';
import React from 'react'
import { theme } from '../../theme/theme';
import { Caixa, LogoBlue } from './styled-cabecalho';
import Logo from "../../assets/logo-bluein.png";

function Cabecalho() {
    return (
        <ThemeProvider theme={theme}>
            <Caixa>
                <LogoBlue src={Logo} />
            </Caixa>
        </ThemeProvider>
    )
}

export default Cabecalho;