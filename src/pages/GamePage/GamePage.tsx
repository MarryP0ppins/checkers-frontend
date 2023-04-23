import React, { useMemo } from 'react';
import { cn } from '@bem-react/classname';
import { Game } from 'classes/Game/game';
import { CheckerColor } from 'classes/Game/game.types';

import { GameBoard } from 'components/GameBoard';
import { Header } from 'components/Header';

import './GamePage.scss';

const cnGame = cn('game-page');

export const GamePage: React.FC = () => {
    const game = useMemo(() => new Game(CheckerColor.BLACK), []);

    return (
        <div className={cnGame()}>
            <Header />
            <div className={cnGame('container')}>
                <GameBoard game={game} />
            </div>
        </div>
    );
};
