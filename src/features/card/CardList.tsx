import React from "react";
import { useRecoilValue } from "recoil";
import { cardState } from "../../store/TodoState";
import Card from "./Card";

function CardList() {
  const cards = useRecoilValue(cardState);

  return (
    <div>
      {cards.cardId.map((cardId) => {
        return <Card key={cardId} cardId={cardId} />;
      })}
    </div>
  );
}

export default CardList;
