import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';


interface PropTypes{
    checked : boolean,
    disabled : boolean,
    onClick : (check : boolean) => void
}

export default function Checkbox({checked, disabled, onClick}:PropTypes) {

    const onChange = (e:ChangeEvent<HTMLInputElement>):void => {
        onClick(!checked);
    }

    return (
        <CheckboxWrap>
            <CheckboxStyled type="checkbox" checked={checked} onChange={onChange} disabled={disabled}/>
        </CheckboxWrap>
    );
}

const CheckboxWrap = styled.span`
 /* border : 1px solid black; */
 padding: 3px;
`
const CheckboxStyled = styled.input`
    border : 0;
`
