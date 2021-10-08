import React from 'react';
import { useRecoilValue } from 'recoil';
import { getTodoList } from '../../store/TodoState';
import Card from './Card';

function CardList() {
    const cards = useRecoilValue(getTodoList);

    return (
        <div>
            {cards.map(card => {
                return <Card key={card.cardId} cardId={card.cardId} />
            })}
        </div>
    );
}

export default CardList;