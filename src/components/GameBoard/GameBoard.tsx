import React, { useState } from 'react';
import { cn } from '@bem-react/classname';
import { CheckerColor } from 'classes/Game/game.types';

import { Checker } from 'components/Checker';
import { BoardSquare } from 'components/GameBoard/BoardSquare';

import { GameBoardProps } from './GameBoard.types';

import './GameBoard.scss';

const cnGameBoard = cn('game-board');

export const GameBoard: React.FC<GameBoardProps> = ({ game, state, updateState, size}) => {
    const [,] = useState<string | undefined>(state);
    return (
        <div className={cnGameBoard()} style={{ height: size, width: size }}>
            {[...Array(64).keys()].map((squareId, index) => {
                const playerColor = game.getPlayerColor();
                const x = playerColor === CheckerColor.WHITE ? squareId % 8 : 7 - (squareId % 8);
                const y = playerColor === CheckerColor.WHITE ? 7 - Math.floor(squareId / 8) : Math.floor(squareId / 8);
                const checker = game.isSomeOneHere(x, y);
                return (
                    <BoardSquare
                        key={index}
                        x={x}
                        y={y}
                        index={squareId}
                        game={game}
                        updateState={updateState}
                    >
                        {(playerColor === CheckerColor.WHITE ? x === 0 : x === 7) && (
                            <div className={cnGameBoard('y-axis')}>{y + 1}</div>
                        )}
                        {checker && <Checker {...checker} game={game} />}
                        {(playerColor === CheckerColor.WHITE ? y === 0 : y === 7) && (
                            <div className={cnGameBoard('x-axis')}>{String.fromCharCode(x + 97)}</div>
                        )}
                    </BoardSquare>
                );
            })}
        </div>
    );
};
