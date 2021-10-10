import React, { useCallback, useEffect, useMemo } from "react";
import {
  todoState,
  TodoTypes,
  cardState,
  getNextCardKey,
  cardTypes,
} from "./../../store/TodoState";
import { useRecoilState, useRecoilValue } from "recoil";

export function useCardCtrl(cardId: string) {
  const [cards, setCards] = useRecoilState<cardTypes>(cardState);
  const [todos, setTodos] = useRecoilState<TodoTypes[]>(todoState);
  const allFilter = cards.allFilter;
  const nextCardKey = useRecoilValue<string>(getNextCardKey);

  const onAddCard = (): void => {
    const cardIds = cards.cardId;
    const find = cardIds.find((id) => id === cardId);
    if (find) {
      const index = cardIds.indexOf(find);
      const tempCards = [...cardIds];
      tempCards.splice(index + 1, 0, nextCardKey);

      const newCard = {
        cardId: nextCardKey,
        filter: "all",
        todoList: [
          {
            id: 1,
            contents: "",
            complete: false,
          },
        ],
      };

      setCards({ ...cards, cardId: tempCards });
      setTodos([...todos, newCard]);
    } else {
    }
  };

  const onRemoveCard = (): void => {
    const cardIds = cards.cardId.filter((id) => id !== cardId);
    setCards({ ...cards, cardId: cardIds });
    setTodos(todos.filter((card) => card.cardId !== cardId));
  };

  const onChangeAllFilter = useCallback(() => {
    setTodos(
      todos.map((card) => {
        return { ...card, filter: allFilter };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFilter]);

  const onFilter = useCallback(
    (code: string): void => {
      setTodos(
        todos.map((card) => {
          return card.cardId === cardId ? { ...card, filter: code } : card;
        })
      );
    },
    [cardId, setTodos, todos]
  );

  const getFilterValue = useMemo((): string => {
    if (cardId === "") return allFilter;
    else {
      const card = todos.find((card) => card.cardId === cardId);
      return card ? card.filter : "all";
    }
  }, [todos, allFilter, cardId]);

  useEffect(() => {
    onChangeAllFilter();
  }, [allFilter, onChangeAllFilter]);

  return {
    onAddCard,
    onFilter,
    onRemoveCard,
    getFilterValue,
  };
}
