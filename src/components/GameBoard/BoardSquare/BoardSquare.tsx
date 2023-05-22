import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { cn } from '@bem-react/classname';
import { socket } from 'api';
import { CheckerColor, CheckerProperty } from 'classes/Game/game.types';
import moment from 'moment';
import { ItemTypes } from 'types/game';

import { BoardSquareProps } from './BoardSquare.types';

import './BoardSquare.scss';

const cnBoardSquare = cn('board-square');

export const BoardSquare: React.FC<BoardSquareProps> = ({ x, y, children, game, updateState, userId }) => {
    const onDropHandle = useCallback(
        (item: CheckerProperty) => {
            game.moveAndKillChecker(item.id, x, y);
            if (!game.hasPossibleMoves()) {
                //Здесь будет отправка данных о совершенном ходе
                socket.emit('playerMakeMove',
                {
                    game_id: game.getGameId(),
                    user_id: userId,
                    checker_id: game.getActiveChecker()?.id ?? -1,
                    new_positions: game.getActiveCheckerMoves(),
                    is_king: game.getActiveChecker()?.isKing ?? false,
                    is_white: game.getActiveChecker()?.color === CheckerColor.WHITE 
                });                
                game.switchTurnToEnemy();
            }
            updateState(moment().format('x'));
        },
        [game, updateState, userId, x, y],
    );
    const canDropHandle = useCallback((item: CheckerProperty) => game.canDoMoveHere(item, x, y), [game, x, y]);

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.CHECKER,
            canDrop: canDropHandle,
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
