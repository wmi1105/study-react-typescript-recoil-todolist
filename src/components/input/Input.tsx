import React, { ChangeEvent } from "react";
import styled from "@emotion/styled";

interface PropTypes {
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
}

export function Input({ value, placeholder, onChange }: PropTypes) {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <InputStyled
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
    />
  );
}

const InputStyled = styled.input`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 3px 5px;
`;
