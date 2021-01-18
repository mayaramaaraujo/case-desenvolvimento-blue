import React from 'react'
import InicioPrincipal from '../../components/InicioPrincipal/InicioPrincipal'
import styled from 'styled-components'

const CaixaInicio = styled.div `
    height: 60%;
    width: 100%;
    box-sizing: border-box;
    background-color: #fefefe;
`

function Inicio() {
    return (
        <CaixaInicio>
            <InicioPrincipal />
        </CaixaInicio>
    )
}

export default Inicio;