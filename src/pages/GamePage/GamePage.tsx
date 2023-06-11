import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CheckerBlackIcon, CheckerWhiteIcon } from 'assets';
import { Game } from 'classes/Game/game';
import { CheckerColor } from 'classes/Game/game.types';
import { useWindowSizeContext } from 'context/WindowSizeContext';
import moment from 'moment';
import { getEnemyProfileAction } from 'store/actions/profile';
import { getUserProfileAction } from 'store/actions/user';
import { error } from 'store/reducers/error';
import { resetCurrentGameState } from 'store/reducers/game';
import { resetMoveState } from 'store/reducers/move';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FetchStatus } from 'types/api';
import { WinnerStatus } from 'types/game';
import { ProfileResponse } from 'types/profile';

import { GameBoard } from 'components/GameBoard';

import './GamePage.scss';

const cnGame = cn('game-page');

export const GamePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user, fetchUserProfileStatus } = useAppSelector((store) => store.user);
    const { currentGame, winner } = useAppSelector((store) => store.game);
    const { lastMoves, gameMoves, enemyMove } = useAppSelector((store) => store.move);
    const { enemyProfile, fetchEnemyProfileStatus } = useAppSelector((store) => store.profile);

    const playerIsUserOne = useMemo(() => {
        if (currentGame && user) {
            return currentGame?.userOneInfo.id === user?.id;
        }
    }, [currentGame, user]);

    useEffect(() => {
        if (fetchUserProfileStatus === FetchStatus.INITIAL) {
            dispatch(getUserProfileAction());
        }
    }, [dispatch, fetchUserProfileStatus]);

    useEffect(() => {
        if (fetchEnemyProfileStatus === FetchStatus.INITIAL && currentGame && playerIsUserOne !== undefined) {
            dispatch(
                getEnemyProfileAction(playerIsUserOne ? currentGame?.userTwoInfo.id : currentGame?.userOneInfo.id),
            );
        }
    }, [currentGame, dispatch, fetchEnemyProfileStatus, playerIsUserOne]);

    const game = useMemo(() => {
        const playerColor = playerIsUserOne ? CheckerColor.WHITE : CheckerColor.BLACK;
        const playerProfile: ProfileResponse = {
            id: user?.id ?? -1,
            username: user?.username ?? '',
            wins: user?.profile.wins ?? 0,
            games: user?.profile.games ?? 0,
            rating: user?.profile.wins ?? 0,
        };
        return new Game({
            playerCheckersColor: playerColor,
            gameId: currentGame?.id ?? -1,
            checkersProperties: lastMoves,
            playerTurn: playerIsUserOne ? Boolean(currentGame?.userOneTurn) : Boolean(!currentGame?.userOneTurn),
            playerProfile: playerProfile,
            enemyProfile: enemyProfile ?? ({} as ProfileResponse),
        });
    }, [currentGame?.id, currentGame?.userOneTurn, enemyProfile, lastMoves, playerIsUserOne, user?.id, user?.profile.games, user?.profile.wins, user?.username]);

    useEffect(() => {
        if (enemyMove) {
            game.enemyMove(enemyMove);
            updateState(moment().format('x'));
        }
    }, [enemyMove, game]);

    const [state, updateState] = useState<string>();
    const { height } = useWindowSizeContext();
    const playerColorWhite = game.getPlayerColor() === CheckerColor.WHITE;

    const columns = useMemo<GridColDef[]>(
        () => [
            { field: 'id', headerName: '№', sortable: false, width: 50 },
            { field: 'white', headerName: 'Белые', sortable: false, width: 82 },
            { field: 'black', headerName: 'Черные', sortable: false, width: 82 },
        ],
        [],
    );
    const actionButtonHandler = useCallback(() => navigate('/'), [navigate]);

    useEffect(() => {
        if (winner !== null) {
            let message = '';
            if (playerIsUserOne && winner === WinnerStatus.USER_1 || !playerIsUserOne && winner === WinnerStatus.USER_2) {
                message = 'Вы победили!';
            } else if (playerIsUserOne && winner === WinnerStatus.USER_2 || !playerIsUserOne && winner === WinnerStatus.USER_1) {
                message = 'Вы проиграли!';
            } else {
                message = 'Ничья!';
            }
            dispatch(
                error({
                    message,
                    actionButtonClick: actionButtonHandler,
                    cancelButtonClick: actionButtonHandler,
                }),
            );
            dispatch(resetMoveState());
            dispatch(resetCurrentGameState());
        }
    }, [actionButtonHandler, dispatch, playerIsUserOne, winner]);

    return (
        <div className={`layout ${cnGame()}`}>
            <GameBoard
                game={game}
                state={state}
                updateState={updateState}
                size={height - 136}
            />
            <div className={cnGame('killed-checkers')} style={{ height: height - 136 }}>
                <div className={cnGame('stack')}>
                    {[
                        ...Array(
                            game.getCountOfDeadCheckers(playerColorWhite ? CheckerColor.WHITE : CheckerColor.BLACK),
                        ).keys(),
                    ].map((index) =>
                        playerColorWhite ? (
                            <CheckerWhiteIcon
                                key={index}
                                height={75}
                                width={75}
                                style={{ position: 'absolute', top: 20 * index }}
                            />
                        ) : (
                            <CheckerBlackIcon
                                key={index}
                                height={75}
                                width={75}
                                style={{ position: 'absolute', top: 20 * index }}
                            />
                        ),
                    )}
                </div>
                <div className={cnGame('stack')}>
                    {[
                        ...Array(
                            game.getCountOfDeadCheckers(playerColorWhite ? CheckerColor.BLACK : CheckerColor.WHITE),
                        ).keys(),
                    ].map((index) =>
                        playerColorWhite ? (
                            <CheckerBlackIcon
                                key={index}
                                height={75}
                                width={75}
                                style={{ position: 'absolute', bottom: 20 * index }}
                            />
                        ) : (
                            <CheckerWhiteIcon
                                key={index}
                                height={75}
                                width={75}
                                style={{ position: 'absolute', bottom: 20 * index }}
                            />
                        ),
                    )}
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
                        rows={gameMoves}
                        density="compact"
                        disableColumnMenu
                        hideFooterPagination
                        hideFooter
                    />
                </Paper>
            </div>
        </div>
    );
};
