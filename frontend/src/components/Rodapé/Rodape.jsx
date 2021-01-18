import { ThemeProvider, Typography } from '@material-ui/core';
import React from 'react'
import { theme } from '../../theme/theme';
import { Caixa } from './styled-rodape';

function Rodape() {
    return (
        <ThemeProvider theme={theme}>
            <Caixa>
                <Typography variant="body" color="secondary">Blue Investimentos - &copy; 2021</Typography>
            </Caixa>
        </ThemeProvider>
    )
}

export default Rodape;