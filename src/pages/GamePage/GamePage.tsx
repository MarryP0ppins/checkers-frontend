import React, { useCallback, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CheckerWhiteIcon } from 'assets';
import { Game } from 'classes/Game/game';
import { CheckerColor } from 'classes/Game/game.types';
import { useWindowSizeContext } from 'context/WindowSizeContext';
import { MovesTableRow } from 'pages/GamePage/GamePage.types';

import { GameBoard } from 'components/GameBoard';

import './GamePage.scss';

const cnGame = cn('game-page');

export const GamePage: React.FC = () => {
    const game = useMemo(() => new Game({ playerCheckersColor: CheckerColor.BLACK }), []);
    const [state, updateState] = useState<string>();
    const { height } = useWindowSizeContext();
    const playerColorWhite = game.getPlayerColor() === CheckerColor.WHITE;

    const moves = useCallback(() => {
        const tmp: MovesTableRow[] = [];
        const playerMoves = game.getPlayerMoves();
        const enemyMoves = game.getEnemyMoves();
        for (let i = 0; i < Math.max(playerMoves.length, enemyMoves.length); i++) {
            tmp.push({
                id: i + 1,
                white: playerMoves.at(i) ?? '',
                black: enemyMoves.at(i) ?? '',
            });
        }
        return tmp;
    }, [game]);

    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'id', headerName: '№', sortable: false, width: 50 },
            { field: 'white', headerName: 'Белые', sortable: false, width: 82 },
            { field: 'black', headerName: 'Черные', sortable: false, width: 82 },
        ],
        [],
    );

    return (
        <div className={`layout ${cnGame()}`}>
            <GameBoard game={game} state={state} updateState={updateState} size={height - 136} />
            <div className={cnGame('killed-checkers')} style={{ height: height - 136 }}>
                <div className={cnGame('stack')}>
                    {[
                        ...Array(
                            game.getCountOfDeadCheckers(playerColorWhite ? CheckerColor.WHITE : CheckerColor.BLACK),
                        ).keys(),
                    ].map((index) => (
                        <CheckerWhiteIcon
                            key={index}
                            height={75}
                            width={75}
                            style={{ position: 'absolute', top: 20 * index }}
                        />
                    ))}
                </div>
                <div className={cnGame('stack')}>
                    {[
                        ...Array(
                            game.getCountOfDeadCheckers(playerColorWhite ? CheckerColor.BLACK : CheckerColor.WHITE),
                        ).keys(),
                    ].map((index) => (
                        <CheckerWhiteIcon
                            key={index}
                            height={75}
                            width={75}
                            style={{ position: 'absolute', bottom: 20 * index }}
                        />
                    ))}
                </div>
            </div>
            <div className={cnGame('game-info')} style={{ height: height - 136 }}>
                <h1 className={cnGame('color-title')}>{`Вы играете ${playerColorWhite ? 'белыми' : 'черными'}`}</h1>
                <div className={cnGame('turn-title', { enemyTurn: !game.isPlayerTurn() })}>
                    {game.isPlayerTurn() ? 'Ваш ход' : 'Ход противника'}
                </div>
                <h1>История ходов</h1>
                <Paper sx={{ width: 250, overflow: 'hidden', height: 400 }}>
                    <DataGrid
                        columns={columns}
                        rows={moves()}
                        rowHeight={25}
                        columnHeaderHeight={36}
                        disableColumnMenu
                        hideFooterPagination
                        hideFooter
                    />
                </Paper>
            </div>
        </div>
    );
};
