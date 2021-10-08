import React, { ChangeEvent } from "react";
import styled from '@emotion/styled';
import SelectOption from "./SelectOption";

interface optionTypes {
  code: string;
  text: string;
}

interface PropTypes {
  options: optionTypes[];
  onChange: (code:string) => void;
  value : string;
}

export default function Select({ options, onChange, value }: PropTypes) {

  const onChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  }

  return (
    <SelectStyled onChange={onChangeHandler} defaultValue={value}>
      {options.map((option: optionTypes) => (
        <SelectOption key={option.code} code={option.code} text={option.text} />
      ))}
    </SelectStyled>
  );
}

const SelectStyled = styled.select`
  padding : 3px 5px;
`;