import React, {useEffect, useMemo} from "react";
import { todoState, TodoTypes, cardState, getNextCardKey } from "./../../store/TodoState";
import { useRecoilState, useRecoilValue } from "recoil";

export function useCardCtrl(cardId:string) {
  const [cards, setCards] = useRecoilState<string[]>(cardState);
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoState);
  const nextCardKey = useRecoilValue<string>(getNextCardKey);

  const onAddCard = (): void => {
      console.log(nextCardKey);

      const find = cards.find(id => id === cardId);
      if(find) {
        const index = cards.indexOf(find);
        const tempCards = [...cards];
        tempCards.splice(index+1, 0, nextCardKey);

        const newCard = {
          cardId : nextCardKey,
          filter : 'all',
          todoList : [
            {
              id: 1,
            contents: "",
            complete: false,
            }
          ]
        }

        setCards(tempCards);
        setTodos([...todos, newCard])        
      }
      else{}
  };

  const onRemoveCard = (): void => {
    // setTodos(todos.filter(todo => todo.cardId !== cardId));
    setCards(cards.filter(id => id !== cardId));
    setTodos(todos.filter(card => card.cardId !== cardId))
    
  }


  const onFilter = (code: string): void => {
    setTodos(
      todos.map((card) => {
        return card.cardId === cardId
          ? { ...card, complete: code }
          : cardId === ""
          ? { ...card, complete: code }
          : card;
      })
    );
  };


  const getFilterValue = ():string => {
    const card = todos.find(card => card.cardId === cardId);
      return card ? card.filter:'all';
  }

//   useEffect(() => {
//     console.log(cards);
//   }, [cards])

  return {
    onAddCard,
    onFilter,
    onRemoveCard,
    getFilterValue
  };
}
