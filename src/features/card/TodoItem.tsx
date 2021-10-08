import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Button from "../../components/button/Button";
import Checkbox from "../../components/checkbox/Checkbox";
import { Input } from "../../components/input/Input";
import { TodoItemTypes } from "../../store/TodoState";
import { useTodoCtrl } from "./useTodoCtrl";

interface StyledProps {
  width: string;
}

interface PropTypes extends TodoItemTypes{
  cardId : string
}

export default function TodoItem({ id, contents, complete, cardId }: PropTypes) {
  const [input, setInput] = useState(contents);

  const {onAddContents, onAddTodo, onToggleComplete, onRemoveTodo} = useTodoCtrl();

  const onChangeInput = (val: string) => {
    setInput(val);
  };

  const onClickAddHandler = () => {
    onAddTodo(cardId, id);
  }

  useEffect(() => {
    if(input !== contents) onAddContents(cardId, id, input);
  }, [input, onAddContents, cardId, id, contents])

  return (
    <ItemWrap>
      <ColWrap width="60%">
        <Input value={input} onChange={onChangeInput} placeholder="" />
      </ColWrap>
      <ColWrap width="40%">
        <Checkbox checked={complete} disabled={(id===0)} onClick={() => onToggleComplete(id)} />
        <Button theme="primary" label="추가" onClick={onClickAddHandler} />
        <Button theme="primary" label="삭제" onClick={() => onRemoveTodo(id)} />
      </ColWrap>
    </ItemWrap>
  );
}

const ItemWrap = styled.div`
  /* width: 100%; */
`;

const ColWrap = styled.div`
  float: left;
  box-sizing: border-box;
  width: ${(props: StyledProps) => (props.width ? props.width : "*")};
`;
