import React from "react";
import TodoItem from "./TodoItem";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { getTodos, TodoItemTypes } from "../../store/TodoState";

interface PropTypes{
  cardId: string;
}

export default function TodoList({ cardId }: PropTypes) {
  const todoList = useRecoilValue(getTodos(cardId));

  return (
    <TodoListWrap>
      {todoList.map((todo: TodoItemTypes) => {
        const { id, contents, complete } = todo;
        return (
          <TodoItem
            key={id}
            id={id}
            contents={contents}
            complete={complete}
            cardId = {cardId}
          />
        );
      })}
    </TodoListWrap>
  );
}

const TodoListWrap = styled.div`
  width: 100%;
  padding: 3px 20px;
  box-sizing: border-box;
  height: 150px;
  overflow-y: auto;
  margin-top: 5px;
`;