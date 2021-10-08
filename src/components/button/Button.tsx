import React from 'react';
import styled from '@emotion/styled';

interface PropTypes {
    theme : 'primary'|'seconds' | 1,
    label : string,
    onClick : () => void
}

export default function Button({label, onClick}:PropTypes) {
    return (
        <ButtonStyled onClick={onClick}>{label}</ButtonStyled>
    );
}

const ButtonStyled = styled.button`
    background-color: #fff;
    margin: 3px;
    border: 1px solid gray;
    padding: 2px 5px;
`