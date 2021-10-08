import React from "react";
import styled from "@emotion/styled";
import Button from "../../components/button/Button";
import TodoList from "./TodoList";
import Filter from "./Filter";
import { useCardCtrl } from "./useCardCtrl";

interface PropTypes {
  cardId: string;
}

export default function Card({cardId}:PropTypes) {
  const {onAddCard, onRemoveCard} = useCardCtrl(cardId);

  return (
    <ContainerWrap>
      <CardWrap>
        <FilterWrap>
          <Filter cardId={cardId} />
        </FilterWrap>
          <TodoList cardId={cardId} />
      </CardWrap>
      <ButtonsWrap>
        <Button theme="primary" label="추가" onClick={onAddCard} />
        <Button theme="primary" label="삭제" onClick={onRemoveCard} />
      </ButtonsWrap>
    </ContainerWrap>
  );
}

const ContainerWrap = styled.div`
  /* width: 100%; */
`;

const CardWrap = styled.div`
  border: 1px solid black;
  margin-bottom: 15px;
  width: 90%;
  float: left;
  box-sizing: border-box;
`;
const ButtonsWrap = styled.div`
    width: 10%;
    float: right;
`;

const FilterWrap = styled.div`
  padding: 5px;
  text-align: right;
`;
