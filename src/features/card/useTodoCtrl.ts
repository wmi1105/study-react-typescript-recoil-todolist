import React, {useEffect} from "react";
import { TodoTypes, todoState, TodoItemTypes } from "./../../store/TodoState";
import { useRecoilState } from "recoil";

export function useTodoCtrl() {
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoState);

  const onAddContents = (cardId : string, todoId : number, contents : string):void => {
    setTodos(
      todos.map(card => {
        if(card.cardId === cardId){
          const todoList = card.todoList.map(todo => {
            return todo.id === todoId ? {...todo, contents}: todo;
          })
          return {...card, todoList};
        }else{
          return card;
        }
      })
    )
  }

  const onAddTodo = (cardId : string, id : number):void => {
    const find = todos.find(card => card.cardId === cardId);
    const newContents : TodoItemTypes = {
      id : 1, 
      contents : "", 
      complete : false
    }

    if(find){
      const todolist = find.todoList;
      const todo = todolist.filter(todo => todo.id === id);
      const todoIndex = todolist.indexOf(todo[0]);
      console.log(todoIndex)
      console.log(todolist.splice(todoIndex+1, 0, newContents))

      // const result = [];
      // for(var i=0; i<todolist.length; i++){
      //   const todo = todolist[i];
      //   result.push(todo);
      //   if(todo.id === id) result.push(newContents);
      // }

      // console.log(result)
      
    }else{

    }
    /* setTodos(
      todos.map(card => {
        const todoList = [];
        const newContents = {
          id : 1, 
          contents : "", 
          complete : false
        }

        return card.cardId === cardId ? {...card, todoList} : card;
      })
    ) */
  }

  //완료 체크 토글
  const onToggleComplete = (todoId : number) : void=> {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id !== todoId ? todo : { ...todo, complete: !todo.complete }
    //   )
    // );
  };

  //todo 삭제
  const onRemoveTodo = (todoId : number) : void => {
    // setTodos(todos.filter(todo => todo.id !== todoId));
  }

//   useEffect(() => {
//     console.log(todos);
//   }, [todos])

  return {
    onAddContents,
    onAddTodo,
    onToggleComplete,
    onRemoveTodo
  };
}
