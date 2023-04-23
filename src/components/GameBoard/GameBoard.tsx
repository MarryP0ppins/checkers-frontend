import React, { useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';
import { CheckerColor } from 'classes/Game/game.types';

import { Checker } from 'components/Checker';
import { BoardSquare } from 'components/GameBoard/BoardSquare';

import { GameBoardProps } from './GameBoard.types';

import './GameBoard.scss';

const cnGameBoard = cn('game-board');

export const GameBoard: React.FC<GameBoardProps> = ({ game }) => {
    const [state, updateState] = useState<string>();
    const [board, updateBoard] = useState<JSX.Element[]>();
    useEffect(
        () =>
            updateBoard(
                [...Array(64).keys()].map((squareId, index) => {
                    const x = game.playerColor() === CheckerColor.WHITE ? squareId % 8 : 7 - (squareId % 8);
                    const y =
                        game.playerColor() === CheckerColor.WHITE
                            ? 7 - Math.floor(squareId / 8)
                            : Math.floor(squareId / 8);
                    const checker = game.isSomeOneHere(x, y);
                    return (
                        <BoardSquare key={index} x={x} y={y} index={squareId} game={game} updateState={updateState}>
                            {checker && <Checker {...checker} game={game} />}
                        </BoardSquare>
                    );
                }),
            ),
        [game, state],
    );
    return <div className={cnGameBoard()}>{board}</div>;
};
