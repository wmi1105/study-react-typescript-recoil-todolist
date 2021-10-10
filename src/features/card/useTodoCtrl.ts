import React from "react";
import { TodoTypes, todoState } from "./../../store/TodoState";
import { useRecoilState } from "recoil";

export function useTodoCtrl(cardId: string) {
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoState);

  const onAddContents = (todoId: number, contents: string): void => {
    setTodos(
      todos.map((card) => {
        if (card.cardId === cardId) {
          const todoList = card.todoList.map((todo) => {
            return todo.id === todoId ? { ...todo, contents } : todo;
          });
          return { ...card, todoList };
        } else {
          return card;
        }
      })
    );
  };

  const onAddTodo = (id: number): void => {
    const find = todos.find((card) => card.cardId === cardId);
    const newContents = {
      id: 1,
      contents: "",
      complete: false,
    };

    if (find) {
      const todolist = [...find.todoList];
      const todo = todolist.filter((todo) => todo.id === id);
      const todoIndex = todolist.indexOf(todo[0]);
      todolist.splice(todoIndex + 1, 0, newContents);

      const result = todolist.map((todo, idx) => ({ ...todo, id: idx + 1 }));

      setTodos(
        todos.map((card) => {
          return card.cardId === cardId ? { ...card, todoList: result } : card;
        })
      );
    } else {
    }
  };

  //완료 체크 토글
  const onToggleComplete = (todoId: number): void => {
    setTodos(
      todos.map((card) => {
        if (card.cardId !== cardId) return card;
        else {
          const todoList = card.todoList.map((todo) =>
            todo.id !== todoId ? todo : { ...todo, complete: !todo.complete }
          );
          return { ...card, todoList };
        }
      })
    );
  };

  //todo 삭제
  const onRemoveTodo = (todoId: number): void => {
    setTodos(
      todos.map((card) => {
        if (card.cardId !== cardId) return card;
        else {
          const todoList = card.todoList.filter((todo) => todo.id !== todoId);
          return { ...card, todoList };
        }
      })
    );
  };

  return {
    onAddContents,
    onAddTodo,
    onToggleComplete,
    onRemoveTodo,
  };
}
