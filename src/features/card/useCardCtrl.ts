import React, {useEffect, useMemo} from "react";
import { todoState, TodoTypes, cardState, getNextCardKey } from "./../../store/TodoState";
import { useRecoilState, useRecoilValue } from "recoil";
import { dateFormat } from "../../util/util";

export function useCardCtrl(cardId:string) {
  const [cards, setCards] = useRecoilState<string[]>(cardState);
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoState);
  const nextCardKey = useRecoilValue<string>(getNextCardKey);

  const onAddCard = (): void => {
      setCards([...cards, nextCardKey])
  };

  const onRemoveCard = (): void => {
    // setTodos(todos.filter(todo => todo.cardId !== cardId));
    setCards(cards.filter(id => id !== cardId));
  }

  const onFilter = (code: string): void => {
    // if (cardId > 0) {
    //   setCards(cards.map((card) => {
    //       return card.cardId !== cardId ? card : { ...card, filter: code };
    //     })
    //   );
    // } else {
    //   setCards(cards.map((card) => ({ ...card, filter: code })));
    // }
  };

  const getFilterValue = useMemo(():string => {
      // const card = cards.find(card => card === cardId);
      // return card ? card.filter:"all";

      return 'all';
  }, [cardId, cards])

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
