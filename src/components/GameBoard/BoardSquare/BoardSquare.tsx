import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { cn } from '@bem-react/classname';
import { CheckerProperty } from 'classes/Game/game.types';
import { ItemTypes } from 'types/game';

import { BoardSquareProps } from './BoardSquare.types';

import './BoardSquare.scss';

const cnBoardSquare = cn('board-square');

export const BoardSquare: React.FC<BoardSquareProps> = ({ x, y, children, game, updateState }) => {
    const onDropHandle = useCallback(
        (item: CheckerProperty) => {
            game.killChecker(item.id, x, y);
            game.moveChecker(item.id, x, y);
            updateState(Date());
        },
        [game, updateState, x, y],
    );
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.CHECKER,
            canDrop: (item: CheckerProperty) => game.canMoveHere(item, x, y),
            drop: onDropHandle,
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [game],
    );

    const black = (x + y) % 2 === 0;
    return (
        <div ref={drop} className={cnBoardSquare({ black })}>
            <div className={cnBoardSquare('dropZone')}>{children}</div>

            <div
                className={cnBoardSquare('overlay', {
                    illegal: isOver && !canDrop,
                    possible: !isOver && canDrop,
                    legal: isOver && canDrop,
                })}
            />
        </div>
    );
};
