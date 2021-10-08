import React, { useCallback, useEffect, useState } from "react";
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

  const {onAddContents, onAddTodo, onToggleComplete, onRemoveTodo} = useTodoCtrl(cardId);

  //input에 할일 입력
  const onChangeInput = useCallback((val: string) => {
    onAddContents(id, val);
  }, [onAddContents, id]);

  //할일 '추가'버튼 
  const onClickAddHandler = useCallback(() => {
    onAddTodo(id);
  }, [onAddTodo, id])

  //완료 체크박스 토글
  const onCheckToggle = useCallback(() => {
    onToggleComplete(id)
  }, [onToggleComplete, id])

  //할일 삭제 버튼
  const onClickRemove = useCallback(() => {
    onRemoveTodo(id);
  }, [onRemoveTodo, id])

  //input 초기값 설정
  useEffect(() => {
    setInput(contents);
  }, [contents])

  return (
    <ItemWrap>
      <ColWrap width="60%">
        <Input value={input} onChange={onChangeInput} placeholder="" />
      </ColWrap>
      <ColWrap width="40%">
        <Checkbox checked={complete} disabled={(id===0)} onClick={onCheckToggle} />
        <Button theme="primary" label="추가" onClick={onClickAddHandler} />
        <Button theme="primary" label="삭제" onClick={onClickRemove} />
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
