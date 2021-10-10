import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import { dateFormat } from "../util/util";

export const filterOptions = [
  { code: "all", text: "전체" },
  { code: "complete", text: "완료" },
  { code: "uncomplete", text: "비완료" },
];

export interface TodoItemTypes {
  id: number;
  contents: string;
  complete: boolean;
}

export interface TodoTypes {
  cardId: string;
  filter: string;
  todoList: TodoItemTypes[];
}

export interface cardTypes {
  cardId: string[];
  allFilter: string;
}

export const todoState = atom<TodoTypes[]>({
  key: "todos",
  default: [
    {
      cardId: "211008093402",
      filter: "all",
      todoList: [
        {
          id: 1,
          contents: "해야할 일",
          complete: true,
        },
        {
          id: 2,
          contents: "해야할 일2",
          complete: false,
        },
        {
          id: 3,
          contents: "해야할 일2ff",
          complete: false,
        },
      ],
    },
    {
      cardId: "211008093422",
      filter: "all",
      todoList: [
        {
          id: 1,
          contents: "해야할 일21",
          complete: false,
        },
      ],
    },
  ],
});

export const cardState = atom<cardTypes>({
  key: "cards",
  default: {
    cardId: ["211008093402", "211008093422"],
    allFilter: "all",
  },
});

export const getTodos = selectorFamily<TodoItemTypes[], string>({
  key: "getTodos",
  get:
    (cardId) =>
    ({ get }) => {
      const todos = get(todoState);
      const card = todos.filter((todo) => todo.cardId === cardId)[0];

      const todoList = card.todoList;
      switch (card.filter) {
        case "complete":
          return todoList.filter((todo) => todo.complete);

        case "uncomplete":
          return todoList.filter((todo) => !todo.complete);

        default:
          return todoList;
      }
    },
});

export const getAllFilter = selector<string>({
  key: "getAllFilter",
  get: ({ get }) => {
    const cards = get(cardState);
    return cards.allFilter;
  },
  set: ({ set }, code) => {
    set(cardState, (prevState) => {
      const filter: string = code instanceof DefaultValue ? "all" : code;
      return { ...prevState, allFilter: filter };
    });
  },
});

export const getNextCardKey = selector<string>({
  key: "getNextCardNumber",
  get: ({ get }) => {
    let uniqKey: string = "";
    const cards = get(cardState);
    while (uniqKey !== "") {
      const dateKey = dateFormat("", "YYMMDDhhmmsszzz");
      const find = cards.cardId.find((id) => id === dateKey);
      if (find) {
        uniqKey = dateKey;
      }
    }
    return uniqKey;
  },
});

// export const getNextCardNumber = selector({
//   key: "getTodoList",
//   get: ({ get }) => {
//     const cards = get(cardState);
//     return Math.max(...cards.map(card => card.index)) +1
//   }
// })

// export const getUnfilteredList = selector({
//   key: 'getUnfilteredList',
//   get: ({get}) => {
//     const cards = get(cardState)
//     return cards.mapp....
//   }
// })
