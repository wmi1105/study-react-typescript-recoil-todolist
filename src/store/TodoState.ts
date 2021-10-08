import { atom, selector, selectorFamily } from "recoil";
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

export const todoState = atom<TodoTypes[]>({
  key: "todos",
  default: [
    {
      cardId: '211008093402',
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
      cardId: '211008093422',
      filter: "all",
      todoList: [
        {
          id: 1,
          contents: "해야할 일21",
          complete: false,
        }
      ],
    }
  ],
});

export const cardState = atom<string[]>({
  key: "cards",
  default: ['211008093402', '211008093422']
});

export const getTodoList = selector({
  key: "getTodoList",
  get: ({ get }) => {
    const cards = get(cardState); //string[]
    const todos = get(todoState); //todoType

    return cards.map((cardId) => {
      const filter : TodoTypes[] = todos.filter((todo) => todo.cardId === cardId);
      const card = filter[0];
      return { cardId, todos: arrayFilter(card.filter, card.todoList)};
    });
  },
});

function arrayFilter(filter: string, rows: TodoItemTypes[]) {
  if (filter === "complete") return rows.filter((todo) => todo.complete);
  else if (filter === "uncomplete")
    return rows.filter((todo) => !todo.complete);
  else return rows;
}

export const getTodos = selectorFamily<TodoItemTypes[], string>({
  key: "getTodos",
  get:
    (cardId) =>
    ({ get }) => {
      const todos = get(todoState);
      const filter  =todos.filter(todo => todo.cardId === cardId);
      return filter[0].todoList;
    }
});

export const getNextCardKey = selector<string>({
  key : "getNextCardNumber",
  get : ({get}) => {
    let uniqKey :string = "";
    const cards = get(cardState);
    while(uniqKey !== ""){
      const dateKey = dateFormat('','YYMMDDhhmmsszzz');
      const find = cards.find(id => (id === dateKey))
      if(find){
        uniqKey = dateKey;
      }
    }
    return uniqKey;
  }
})


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

